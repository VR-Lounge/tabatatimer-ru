<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(false);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	#проверка, что форма заполнена через AJAX
	if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		#проверка на скрытое поле
		if(isset($_POST["name"]) && $_POST["name"] == "") {
			$pol_time = $_GET['p'];
			$vernii_shifr = md5($pol_time."tabata");
			$pol_shifr = $_POST['zf'];
			#проверка MD5
			if($vernii_shifr == $pol_shifr){
				
				$name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["myrealname"])));
				$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
				$phone = trim($_POST["phone"]);
				$goods = trim($_POST["goods"]);
				
				$content = "Товар: $goods\n\n";
				$content .= "Имя: $name\n";
				$content .= "Email: $email\n";
				$content .= "Телефон: $phone\n";

				try {
					$mail->isSMTP();
					$mail->Host       = 'ssl://smtp.yandex.ru';
					$mail->SMTPAuth   = true;
					$mail->Username   = 'admin@tabatatimer.ru';
					$mail->Password   = 'tabatatimer1878307';
					$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
					$mail->Port       = 465;
					$mail->setFrom('admin@tabatatimer.ru', 'Tabatatimer.ru');
					# КОМУ 1
					//$mail->addAddress('ru-jah@ya.ru'); 
					$mail->addAddress('info@allmulticam.ru'); 
						//$mail->addReplyTo('admin@tabatatimer.ru', 'noreply');
					# КОМУ 2
					$mail->addCC('allmulticam.ru@gmail.com');
					
					$mail->CharSet = "utf-8";
					//$mail->isHTML(true);                                
					$mail->Subject = 'Заявка с сайта tabatatimer.ru';
					$mail->Body    = "{$content}";
					//$mail->AltBody = "{$content}";
					$mail->send();
					
					http_response_code(200);
					echo "Заявка отправлена. Скоро мы с вами свяжемся! ";
					echo "Заказы обрабатываются ПН-ПТ с 10 до 18ч";
					
					
				} catch (Exception $e) {
					http_response_code(500);
					echo "Ой-ой, возникла ошибка ({$mail->ErrorInfo}). Пожалуйста, попробуйте заново.";
				}
			}
		}
	} 
	else {
		http_response_code(403);
		echo "Обнаружена попытка спама. Повторите чуть позже!";
	}
}


?>