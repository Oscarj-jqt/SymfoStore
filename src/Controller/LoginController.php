<?php

namespace App\Controller;

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    private $entityManager;

    // Injection du service Doctrine dans le constructeur
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * In routes.yaml file.
     *
     * @Route("/api/login", name="api_login", methods={"POST"})
     */
    public function login(Request $request, JWTTokenManagerInterface $JWTManager, UserPasswordHasherInterface $passwordEncoder): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse(['message' => 'Email and password are required'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // checking is user existing
        $user = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(['email' => $email]);

        $roles = $user->getRoles();
        error_log('User roles: '.json_encode($roles));

        // Checking if user has admin role
        if (in_array('ROLE_ADMIN', $roles, true)) {
            $token = $JWTManager->create($user);

            return new JsonResponse([
                'message' => 'Login successful as Admin',
                'token' => $token,
            ]);
        } else {
            return new JsonResponse([
                'message' => 'Login successful as User. No token provided.',
            ]);
        }
    }
}
