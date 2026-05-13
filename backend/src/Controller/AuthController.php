<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
  #[Route('/api/register', methods: ['POST'])]
  public function register(
    Request $request,
    UserPasswordHasherInterface $passwordHasher,
    EntityManagerInterface $entityManager
  ) {

    try {

      $data = json_decode($request->getContent(), true);

      if (!$data) {
        return $this->json([
          'error' => 'Invalid JSON'
        ], 400);
      }

      $email = $data['email'] ?? null;
      $password = $data['password'] ?? null;
      $prenom = $data['prenom'] ?? null;
      $nom = $data['nom'] ?? null;

      if (!$email || !$password || !$prenom || !$nom) {
        return $this->json([
          'error' => 'Champs manquants'
        ], 400);
      }

      $existingUser = $entityManager
        ->getRepository(User::class)
        ->findOneBy([
          'email' => $email
        ]);

      if ($existingUser) {
        return $this->json([
          'error' => 'Email déjà existant !'
        ], 400);
      }

      $user = new User();

      $user->setEmail($email);
      $user->setPrenom($prenom);
      $user->setNom($nom);

      $hashedPassword = $passwordHasher->hashPassword($user, $password);

      $user->setPassword($hashedPassword);

      $entityManager->persist($user);
      $entityManager->flush();

      return $this->json([
        'message' => 'User created'
      ]);

    } catch (\Exception $e) {

      return $this->json([
        'error' => $e->getMessage()
      ], 500);

    }

  }

  #[Route('/api/login', methods: ['POST'])]
  public function login(
    Request $request,
    UserRepository $userRepository,
    UserPasswordHasherInterface $passwordHasher,
    JWTTokenManagerInterface $JWTManager
  ) {

    $data = json_decode($request->getContent(), true);

    if (!$data) {
      return $this->json([
        'error' => 'Invalid JSON'
      ], 400);
    }

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (empty($email) || empty($password)) {
      return $this->json([
        'error' => 'Champs manquants'
      ], 400);
    }

    $user = $userRepository->findOneBy([
      'email' => $email
    ]);

    if (!$user) {
      return $this->json([
        'error' => 'Identifiants invalides'
      ], 401);
    }

    if (!$passwordHasher->isPasswordValid($user, $password)) {
      return $this->json([
        'error' => 'Identifiants invalides'
      ], 401);
    }

    $token = $JWTManager->create($user);

    return $this->json([
      'token' => $token,
      'user' => [
        'id' => $user->getId(),
        'nom' => $user->getNom(),
        'prenom' => $user->getPrenom()
      ]
    ]);

  }

  #[Route('/api/logout', methods: ['POST'])]
  public function logout()
  {

    return $this->json([
      'message' => 'User disconnected'
    ]);

  }

  #[Route('/api/deleteAccount', methods: ['POST'])]
  public function deleteAccount(
    Request $request,
    UserRepository $userRepository,
    EntityManagerInterface $entityManager,
    UserPasswordHasherInterface $passwordHasher
  ) {

    $data = json_decode($request->getContent(), true);

    if (!$data) {
      return $this->json([
        'error' => 'Invalid JSON'
      ], 400);
    }

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (empty($email) || empty($password)) {
      return $this->json([
        'error' => 'Champs manquants'
      ], 400);
    }

    $user = $userRepository->findOneBy([
      'email' => $email
    ]);

    if (!$user) {
      return $this->json([
        'error' => 'User does not exists'
      ], 404);
    }

    if (!$passwordHasher->isPasswordValid($user, $password)) {
      return $this->json([
        'error' => 'Identifiants invalides'
      ], 401);
    }

    $entityManager->remove($user);
    $entityManager->flush();

    return $this->json([
      'message' => 'Account deleted'
    ]);

  }
}