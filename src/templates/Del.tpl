<?php
require_once('./actions/Manter{{CLASS_NAME}}.php');
require_once('./dto/{{CLASS_NAME}}.php');

$db_{{INSTANCIA}} = new Manter{{CLASS_NAME}}();

${{VARIAVEL}} = new {{CLASS_NAME}}();

$id = $_REQUEST['id'];

$db_{{INSTANCIA}}->excluir($id);

