<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Création des catégories
        $categoriesData = [
            1 => 'Alimentation',
            2 => 'Voiture',
            3 => 'Roman',
            4 => 'Vêtement',
            5 => 'Electronique',
        ];

        $categories = [];

        foreach ($categoriesData as $id => $name) {
            $category = new Category();
            $category->setName($name);
            $manager->persist($category);
            $categories[$id] = $category;
        }

        $manager->flush();

        // Création des produits
        $productsData = [
            ['category_id' => 1, 'name' => 'Steak haché de bœuf', 'description' => 'Viande de bœuf fraîche et savoureuse', 'price' => 7.99],
            ['category_id' => 1, 'name' => 'Œufs', 'description' => 'Boîte de 12 œufs bio', 'price' => 3.50],
            ['category_id' => 2, 'name' => 'BMW', 'description' => 'Voiture haut de gamme alliant performance et confort.', 'price' => 55000.00],
            ['category_id' => 2, 'name' => 'Volkswagen', 'description' => 'Une voiture fiable et économique pour la famille.', 'price' => 25000.00],
            ['category_id' => 3, 'name' => 'Le Chien de Baskerville', 'description' => 'Un roman policier de Sherlock Holmes par Arthur Conan Doyle.', 'price' => 12.99],
            ['category_id' => 3, 'name' => 'Une étude en rouge', 'description' => 'La première aventure de Sherlock Holmes.', 'price' => 10.99],
            ['category_id' => 4, 'name' => 'Bottes', 'description' => 'Chaussures robustes en cuir pour l’hiver.', 'price' => 89.99],
            ['category_id' => 4, 'name' => 'Veste en cuir', 'description' => 'Veste élégante en cuir véritable.', 'price' => 149.99],
            ['category_id' => 5, 'name' => 'PC portable Asus', 'description' => 'Ordinateur portable performant pour le travail et le gaming.', 'price' => 1200.00],
            ['category_id' => 5, 'name' => 'iPhone 16', 'description' => 'Dernier modèle d’Apple avec caméra améliorée et performance optimisée.', 'price' => 1500.00]
        ];

        foreach ($productsData as $data) {
            $product = new Product();
            $product->setCategory($categories[$data['category_id']]);
            $product->setName($data['name']);
            $product->setDescription($data['description']);
            $product->setPrice($data['price']);

            $manager->persist($product);
        }

//        Saving products in database
        $manager->flush();
    }
}
