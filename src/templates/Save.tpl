<?php
require_once('./actions/Manter{{CLASS_NAME}}.php');
require_once('./dto/{{CLASS_NAME}}.php');

$db_{{INSTANCIA}} = new Manter{{CLASS_NAME}}();
${{VARIAVEL}} = new {{CLASS_NAME}}();

$id = isset($_POST['id']) ? $_POST['id'] : 0;

${{VARIAVEL}}->id = $id;

$db_{{INSTANCIA}}->salvar(${{VARIAVEL}});
header('Location: servicos.php');


