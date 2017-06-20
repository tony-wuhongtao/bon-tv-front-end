<?php
$your_mail_adress = 'your@domain.com';
$form = '<table cellspacing="1" cellpadding="2" border="0">'."\n";
$subject = 'Online Form from Web Site';

for($i=0; $i<sizeof($_POST['value']); $i++)
{
	$form .= "<tr>\n\t<td valign=\"top\">".htmlspecialchars($_POST['title'][$i])."</td>\n\t<td>".htmlspecialchars($_POST['value'][$i])."</td>\n</tr>";
}

$form .= '</table>';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";


// Mail it
$result = mail($your_mail_adress, $subject, $form, $headers);

if($result)
	echo '{"status":"OK"}';
else
	echo '{"status":"NOK", "ERR":"Have got an error while sending e-mail."}';

die();

?>