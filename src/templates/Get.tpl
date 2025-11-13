<?php 
require_once('actions/Manter{{CLASS_NAME}}.php');
$manter{{CLASS_NAME}} = new Manter{{CLASS_NAME}}();
${{INSTANCIA}} = $manter{{CLASS_NAME}}->lista();


foreach(${{INSTANCIA}} as $obj) {
    echo "<tr>";
    echo "<td>" . $obj->id . "</td>";
    echo "<td>" ..  "</td>";
    echo "<td>" .. "</td>";
    echo "<td>" .. "</td>";
    echo "</tr>";
}