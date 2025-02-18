<?php

class User
{
    public $prenom;
    public $nom;
    public $email;
    private $pk_user;
    private $authenticated;

    public function __construct($prenom, $nom, $email,$pk_user)
    {
        $this->prenom = $prenom;
        $this->nom = $nom;
        $this->email = $email;
        $this->pk_user= $pk_user;
        $this->authenticated = FALSE;
    }

    public function getPk(){
        return $this->pk_user;
    }

    public function isauthenticated(){
        return $this->authenticated;
    }
    public function setIsAuthenticated($authenticated){
        $this->authenticated = $authenticated;
    }
}
?>