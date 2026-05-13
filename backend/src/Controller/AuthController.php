<?php

namespace App\Controller; // Indique dans quel dossier logique se trouve ma classe


use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface; // Me permet d'utiliser Doctrine (entityManager)
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; // Ma classe hérite de cette classe Symfony
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface; // Me permet de hasher les mots de passe lors du register



use Symfony\Component\Routing\Annotation\Route; // Me permet d'écrire mes routes

use Symfony\Component\HttpFoundation\Request; // Représente la requête HTTP envoyée au serveur (body, headers, etc)
use App\Entity\User; // Représente l'entité User (Entity/User.php)
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;



class AuthController extends AbstractController // Classe AuthController, qui représente donc mon Controller 
{

  #[Route('/api/register', methods: ['POST'])] // Route qui appellera la méthode register() suite à la requête post
  public function register( // Méthode qui sera exécutée lors de l'appelle de la route
    Request $request, //Contient le JSON envoyé par le Frontend
    UserPasswordHasherInterface $passwordHasher, // Hash le mot de passe 
    EntityManagerInterface $entityManager // Gère les interactions avec la base de données (persist, flush, etc)
  ) {
    $data = json_decode($request->getContent(), true); // Transforme le JSON en tableau PHP

    if (!$data) {
      return $this->json(['error' => 'Invalid JSON'], 400); // Condition qui s'exécute en cas de mauvaises informations
    }

    $user = new User(); // Création d'un objet user vide



    // -----------------------------------------------------
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;
    $prenom = $data['prenom'] ?? null;
    $nom = $data['nom'] ?? null;
    //------------------------------------------------------
// ^ Définit les paramètres du User


    $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
    if ($existingUser) {
      return $this->json(['error' => 'Email déjà existant !'], 400);
    }
    // ^ Vérifie si l'email existe déjà dans la BDD

    //------------------------------------------------------
    $user->setEmail($email);
    $user->setPrenom($prenom);
    $user->setNom($nom);

    $hashedPassword = $passwordHasher->hashPassword($user, $password);
    $user->setPassword($hashedPassword);
    // ------------------------------------------------------
// ^ Met à jour les paramètres du nouveau User

    $entityManager->persist($user);
    $entityManager->flush();

    if (!$email || !$password || !$prenom || !$nom) {
      return $this->json(['error' => 'Champs manquants'], 400);
    }

    return $this->json([
      'message' => 'User created'
    ]);
  }



  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  #[Route('/api/login', methods: ['POST'])] // Route qui appellera la méthode login() suite à la requête post
  public function login( // Méthode qui sera exécutée lors de l'appelle de la route
    Request $request, //Contient le JSON envoyé par le Frontend
    UserRepository $userRepository,
    UserPasswordHasherInterface $passwordHasher,
    JWTTokenManagerInterface $JWTManager
  ) {
    $data = json_decode($request->getContent(), true);
    if (!$data) {
      return $this->json(['error' => 'Invalid JSON'], 400);
    }


    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (empty($email) || empty($password)) {
      return $this->json(['error' => 'Champs manquants'], 400);
    }
    $user = $userRepository->findOneBy(['email' => $email]);

    if (!$user) {
      return $this->json(['error' => 'Identifiants invalides'], 401);
    }

    if (!$passwordHasher->isPasswordValid($user, $password)) {
      return $this->json(['error' => 'Identifiants invalides'], 401);
    }

    $token = $JWTManager->create($user);
    return $this->json([
      'token' => $token,
      "user" => [
        "id" => $user->getId(),
        "nom" => $user->getNom(),
        "prenom" => $user->getPrenom()
      ]
    ]);







  }



  #[Route('/api/logout', methods: ['POST'])] // Route qui appellera la méthode logout() suite à la requête post
  public function logout( // Méthode qui sera exécutée lors de l'appelle de la route
  ) {
    return $this->json([
      'message' => 'User disconnected'
    ]);
  }



  #[Route('/api/deleteAccount', methods: ['POST'])] // Route qui appellera la méthode logout() suite à la requête post
  public function deleteAccount( // Méthode qui sera exécutée lors de l'appelle de la route
    Request $request, //Contient le JSON envoyé par le Frontend
    UserRepository $userRepository,
    EntityManagerInterface $entityManager, // Gère les interactions avec la base de données (persist, flush, etc)
    UserPasswordHasherInterface $passwordHasher
  ) {


    $data = json_decode($request->getContent(), true);
    if (!$data) {
      return $this->json(['error' => 'Invalid JSON'], 400);
    }

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (empty($email) || empty($password)) {
      return $this->json(['error' => 'Champs manquants'], 400);
    }


    $user = $userRepository->findOneBy(['email' => $email]);

    if (!$user) {
      return $this->json(['error' => 'User does not exists'], 404);
    }
    if (!$passwordHasher->isPasswordValid($user, $password)) {
      return $this->json(['error' => 'Identifiants invalides'], 401);
    }

    $entityManager->remove($user);
    $entityManager->flush();


    return $this->json([
      'message' => 'Account deleted'
    ]);
  }



}