<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\UserRepository;

class RegistrationController extends AbstractController
{
    private $userRepository;
    private $passwordHasher;

    public function __construct(UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher)
    {
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/register', name: 'user_register', methods: ['POST'])]
    public function register(Request $request, ValidatorInterface $validator): JsonResponse
    {
        // Récupérer les données envoyées par le client (nom, mot de passe)
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name']) || !isset($data['password'])) {
            return new JsonResponse(['error' => 'Name and password are required'], Response::HTTP_BAD_REQUEST);
        }

        // Créer un nouvel utilisateur
        $user = new User();
        $user->setEmail($data['email']);

        // Hachage du mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $data['password']  // Le mot de passe en clair envoyé par le client
        );
        $user->setPassword($hashedPassword);

        // Optionnel : Ajouter un rôle, par exemple "ROLE_USER"
        $user->setRoles(['ROLE_USER']);

        // Sauvegarder l'utilisateur dans la base de données
        $this->userRepository->save($user, true);

        // Retourner une réponse JSON indiquant que l'inscription est réussie
        return new JsonResponse(['message' => 'User registered successfully'], Response::HTTP_CREATED);
    }
}
