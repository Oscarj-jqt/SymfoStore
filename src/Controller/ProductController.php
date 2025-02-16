<?php

namespace App\Controller;

use App\Entity\Category;
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

#[Route('/api/product')]
final class ProductController extends AbstractController
{
    #[Route(name: 'app_product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository): Response
    {
        $products = $productRepository->findAll();

        return $this->json($products, Response::HTTP_OK);
    }

    #[Route('/', name: 'app_product_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, CategoryRepository $categoryRepository, SerializerInterface $serializer): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['name']) || !isset($data['category_id'])) {
            return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

//        $category = $categoryRepository->find($data['category_id']);
//        if (!$category) {
//            return $this->json(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
//        }

        $product = new Product();
        $product->setName($data['name']);
//        $product->setCategory($category['category_id']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);

        // Récupérer la catégorie via son ID
        $category = $entityManager->getRepository(Category::class)->find($data['category_id']);

        if (!$category) {
            return new JsonResponse(['error' => 'Category not found'], 404);
        }
        $product->setCategory($category);
        //        $product->setCreatedAt($data['createdAt']);

        $entityManager->persist($product);
        $entityManager->flush();

        $json = $serializer->serialize($product, 'json', ['groups' => ['product:read']]);

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this->json($product, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_product_edit', methods: ['GET', 'PUT'])]
    public function edit(Request $request, Product $product, EntityManagerInterface $entityManager, CategoryRepository $categoryRepository): Response
    {
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

        $entityManager->flush();

        return $this->json($product, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Request $request, Product $product, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($product);
        $entityManager->flush();

        return $this->json(['message' => 'Product deleted'], Response::HTTP_NO_CONTENT);
    }
}
