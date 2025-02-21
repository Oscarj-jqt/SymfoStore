<?php

namespace App\Tests\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class ProductControllerTest extends WebTestCase
{
    private $client;

    protected function setUp(): void
    {
        parent::setUp();
        $this->client = static::createClient();
    }

    private function getAuthToken(string $email, string $password): string
    {
        $this->client->request('POST', '/api/login', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'email' => $email,
            'password' => $password,
        ]));

        $response = json_decode($this->client->getResponse()->getContent(), true);

        return $response['token'] ?? '';
    }

    public function testEditProductAsAdmin()
    {
        $token = $this->getAuthToken('admin@admin.com', '123456');
        $this->client->setServerParameter('HTTP_Authorization', 'Bearer ' . $token);

        $this->client->request('PUT', '/api/admin/product/edit/11', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Riz thaïlandais',
            'description' => 'Description modifiée',
            'price' => 39.99,
            'category_id' => 6,
        ]));

        $this->assertEquals(Response::HTTP_OK, $this->client->getResponse()->getStatusCode());
        $this->assertJsonStringEqualsJsonString(json_encode(['message' => 'Product updated successfully']), $this->client->getResponse()->getContent());
    }

    public function testEditProductAsNonAdmin()
    {
        $token = $this->getAuthToken('user@user.com', '123456');
        $this->client->setServerParameter('HTTP_Authorization', 'Bearer ' . $token);

        $this->client->request('PUT', '/api/admin/product/edit/11', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Produit Modifié',
            'description' => 'Description modifiée',
            'price' => 99.99,
            'category_id' => 1,
        ]));

        $this->assertEquals(Response::HTTP_FORBIDDEN, $this->client->getResponse()->getStatusCode());
    }

    public function testEditProductWithInvalidData()
    {
        $token = $this->getAuthToken('admin@admin.com', '123456');
        $this->client->setServerParameter('HTTP_Authorization', 'Bearer ' . $token);

        $this->client->request('PUT', '/api/admin/product/edit/11', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => '',
            'description' => 'Description trop courte',
            'price' => -10,
            'category_id' => null,
        ]));

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $this->client->getResponse()->getStatusCode());
    }
}
