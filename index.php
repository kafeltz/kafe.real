<!DOCTYPE html>
<html>
<head>
	<title></title>

	<style>
		* { font-size: 1.3em; }
	</style>

	<script type="text/javascript" src="/bower_components/jquery/dist/jquery.js"></script>
	<script type="text/javascript" src="kafe.real.js"></script>
	<script type="text/javascript">
		$(function()
		{
			$("[data-money-behavior]").moneyBehavior();
		});
	</script>
</head>

<body>

<h2>Money</h2>
<input type="text" value="8,99" placeholder="0,00" data-money-behavior>

<p>&nbsp;</p>

</body>
</html>