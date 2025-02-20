<?php


namespace App\Tests\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class ProductControllerTest extends WebTestCase
{
    public function testEditProductAsAdmin()
    {
        // Créer un client (simule un utilisateur naviguant dans l'application)
        $client = static::createClient();

        // Effectuer la connexion en tant qu'admin avec un JWT valide
        $client->setServerParameter('HTTP_Authorization', 'Bearer <eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NDAwNTkxNzMsImV4cCI6MTc0MDA2Mjc3Mywicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSJ9.fgzf5isPRcdzvaECJ8Lziip3eCek1OYiIFOrVUuiZmGYM7z905aw3fjzoTdWkMrwEQvfpzCl9Ob2WRZrdVHYjw50EP394FSnleLpsKXPlcjr-l0V-bLZZyozQvTwRMceryTJHlAaNIpy7eY3E7oS12_f6ulUwhaWfHdzJHapJuxUKvSkn_4lFChsxM8MENpZGI46kVWPayzM-wgkQi1_oWZXsqARgjMhgLYVKnZ68mJxdNZ5GOCcqhk0EjGOtN96nSY7e9OhKb-6e5jD9lL8a0CC831GEYFYvnXpW9rdldp9jqs9WBwN5q4LNMAqH-8T73IVynW7wcPF8E34vD9vDQ>');

        // Faire une requête PUT pour éditer un produit
        $client->request('PUT', '/api/admin/product/edit/11', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Riz thaïlandais',
            'description' => 'Description modifiée',
            'price' => 39.99,
            'category_id' => 6
        ]));

        // Vérifier le statut de la réponse
        $this->assertEquals(Response::HTTP_OK, $client->getResponse()->getStatusCode());

        // Vérifier que la réponse contient le message attendu
        $this->assertJsonContains(['message' => 'Product updated successfully']);
    }

    public function testEditProductAsNonAdmin()
    {
        // Créer un client
        $client = static::createClient();

        // Effectuer la connexion en tant qu'utilisateur non-admin avec un JWT valide
        $client->setServerParameter('HTTP_Authorization', 'Bearer <ton_token_non_admin_jwt>');

        // Faire une requête PUT pour éditer un produit
        $client->request('PUT', '/api/admin/product/edit/11', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Produit Modifié',
            'description' => 'Description modifiée',
            'price' => 99.99,
            'category_id' => 1
        ]));

        // Vérifier que l'accès est refusé pour un utilisateur sans ROLE_ADMIN
        $this->assertEquals(Response::HTTP_FORBIDDEN, $client->getResponse()->getStatusCode());
    }
}
