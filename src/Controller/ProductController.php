<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/admin/product')]
final class ProductController extends AbstractController
{
    #[Route('/', name: 'app_product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository, SerializerInterface $serializer): Response
    {
        $products = $productRepository->findAll();
        $json = $serializer->serialize($products, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    #[Route('/new', name: 'app_product_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, CategoryRepository $categoryRepository, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['name'], $data['category_id'], $data['description'], $data['price'])) {
            return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $category = $categoryRepository->find($data['category_id']);
        if (!$category) {
            return $this->json(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $product = new Product();
        $product->setName($data['name'])
            ->setDescription($data['description'])
            ->setPrice($data['price'])
            ->setCategory($category);

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            return $this->json(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($product);
        $entityManager->flush();

        $json = $serializer->serialize($product, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, Response::HTTP_CREATED, [], true);
    }

    #[Route('/show/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(Product $product, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($product, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    #[Route('/edit/{id}', name: 'app_product_edit', methods: ['PUT'])]
    public function edit(Request $request, Product $product, EntityManagerInterface $entityManager, CategoryRepository $categoryRepository, ValidatorInterface $validator, SerializerInterface $serializer): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            $product->setPrice($data['price']);
        }
        if (isset($data['category_id'])) {
            $category = $categoryRepository->find($data['category_id']);
            if (!$category) {
                return $this->json(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
            }
            $product->setCategory($category);
        }

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getPropertyPath().' : '.$error->getMessage();
            }

            return $this->json(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->flush();
        $json = $serializer->serialize($product, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    #[Route('/delete/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $entityManager): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $entityManager->remove($product);
        $entityManager->flush();

        return $this->json(['message' => 'Product deleted'], Response::HTTP_NO_CONTENT);
    }
}
