<?php

include ("../../session.php");
include_once ("../../service.php");




function load( $cats, $types){


dbConn();
$productsList = dbSelect("SELECT name, long_name, id, type, price, category, color FROM default_products WHERE type in ($types) AND category IN ($cats) AND active='1' ORDER BY category ASC");
dbDisconn();

$newProducts = array();
foreach ($productsList as $product)
            {
$newProducts[$product['id']]=$product;
            }
        
returnWrapper($newProducts);
}