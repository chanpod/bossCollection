<?php
	

$hostname = "acadmysql.duc.auburn.edu";
$username = "bas0017";
$password = "yoshI105";

$databaseName = "bas0017db";
$tableName = "Order_Detail";


$dbConnected = mysql_connect($hostname, $username, $password);

$dbSelected = mysql_select_db($databaseName,$dbConnected);

			$dbSuccess = true;
			if ($dbConnected) {
				if (!$dbSelected) {
					echo "DB connection FAILED<br /><br />";
					$dbSuccess = false;
				}		
			} else {
				echo "MySQL connection FAILED<br /><br />";
				$dbSuccess = false;
			}
			
			if ($dbSuccess) {
				$fetchTables = "SHOW TABLES FROM ".$databaseName;
				
	
				$result = mysql_query($fetchTables);
				$JSONString = '{"tables": [{';
	
	
					//   SQL script to create table Customer
	/*
				$createCoyTable_SQL = "CREATE TABLE bas0017db.".$tableName." ( ";
				$createCoyTable_SQL .= "BookID INT( 11 ) NOT NULL , ";
				$createCoyTable_SQL .= "OrderID INT( 11 ) NOT NULL, ";
				$createCoyTable_SQL .= "Quantity INT ( 11 )  NOT NULL,";
				$createCoyTable_SQL .= "FOREIGN KEY (BookID) REFERENCES Book,";
				$createCoyTable_SQL .= "FOREIGN KEY (OrderID) REFERENCES `Order`";



	
	
				$createCoyTable_SQL .= ")";
				*/
				if (!$result)  
				{	
					echo "Unable to fetch tables <br />";
					echo mysql_error();
				}
				else 
				{
					while ($row = mysql_fetch_row($result))
					{
						$JSONString .= '"name": "'.$row[0].'","columns":[';
						//echo "Table : {$row[0]} <br />";
						$fetchColumns = "SELECT * FROM `".$row[0]."`";
						$columnResult = mysql_query($fetchColumns);
						if (!$columnResult)
						{
							echo "Unable to fetch columns <br />";
							echo mysql_error();
							}
							else {
								$i = 0;
								while ($i <  mysql_num_fields($columnResult))
								{
									//echo "Information for column ".$i.": <br />";
									$meta = mysql_fetch_field($columnResult, $i);
									//echo $meta -> name;
									//echo "<br />";
									$JSONString .='{"name":"'.$meta -> name.'"},';

									$i++;
									//$JSONString .= "{"name":"".$columnRow.'"},";
									}
																
								}
								$JSONString = rtrim($JSONString, ",");
								$JSONString .='],"data":[';
								$i = 0;
								while ($dataRow = mysql_fetch_array($columnResult, MYSQL_ASSOC))
								{
									
									$JSONString .= '{"items":[';
									$i = 0;
									while ($i < mysql_num_fields($columnResult))
									{
										$meta = mysql_fetch_field($columnResult, $i);
										$currentColumn = $meta -> name;
										$JSONString .= '"'.rtrim($dataRow[$currentColumn]).'",';
										$i++;
									}
									$JSONString = rtrim($JSONString, ",");
									$JSONString .= ']},';
								}
									$JSONString = rtrim($JSONString, ",");
									$JSONString .= ']},{';
								
								
							
							/*
								while ($i <  mysql_num_fields($columnResult))
								{
									echo "Information for column ".$i.": <br />";
									$meta = mysql_fetch_field($columnResult, $i);
									$currentColumn = $meta -> name;
									echo "<br />";
									$JSONString .="{"name":"".$meta -> name.""},";

									$i++;
									//$JSONString .= "{"name":"".$columnRow.""},";
									}
																
								}
*/
					}
					
				}
				$JSONString = rtrim($JSONString, ",");
$JSONString = rtrim($JSONString, "{");
$JSONString = rtrim($JSONString, ",");
				$JSONString .= ']}';
				
				echo $JSONString;
				
			}
?>