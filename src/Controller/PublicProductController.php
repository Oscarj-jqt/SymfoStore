<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/product')]
final class PublicProductController extends AbstractController
{
    #[Route('/', name: 'app_product_public_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository, SerializerInterface $serializer): Response
    {
        $products = $productRepository->findAll();
        $json = $serializer->serialize($products, 'json', ['groups' => 'product:read']);

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }
}
