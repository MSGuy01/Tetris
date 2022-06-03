<?php
    $jsonFile = fopen("savedBlocks.json","w");
    fwrite($jsonFile,$_GET['w']);
    fclose($jsonFile);
    echo 'success';