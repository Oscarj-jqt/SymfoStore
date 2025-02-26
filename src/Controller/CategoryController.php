<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/category')]
final class CategoryController extends AbstractController
{
    #[Route(name: 'app_category_index', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository, Category $category): Response
    {
        return $this->json($category, Response::HTTP_OK, [], ['groups' => 'category:read']);
    }

    #[Route('/new', name: 'app_category_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data['name'])) {
            return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $category = new Category();
        $category->setName($data['name']);

        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json($category, Response::HTTP_OK, [], ['groups' => 'category:read']);

    }

    #[Route('/show/{id}', name: 'app_category_show', methods: ['GET'])]
    public function show(Category $category): Response
    {
        return $this->json($category, Response::HTTP_OK, [], ['groups' => 'category:read']);

    }

    #[Route('/edit/{id}', name: 'app_category_edit', methods: ['PUT'])]
    public function edit(Request $request, Category $category, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data['name'])) {
            return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $category->setName($data['name']);
        $entityManager->flush();

        return $this->json($category, Response::HTTP_OK, [], ['groups' => 'category:read']);

    }

    #[Route('/delete/{id}', name: 'app_category_delete', methods: ['DELETE'])]
    public function delete(Request $request, Category $category, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($category);
        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
