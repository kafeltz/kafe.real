<!DOCTYPE html>
<html>
<head>
	<title></title>

	<style>
		* { font-size: 1.2em; }
	</style>

	<script type="text/javascript" src="/bower_components/jquery/dist/jquery.js"></script>
	<script type="text/javascript" src="kafe.real.js"></script>
	<script type="text/javascript">
		$(function()
		{
			$("#money").moneyBehavior();

			$("#money2").moneyBehavior();

		});
	</script>
</head>

<body>

	<h2>Money (select either on focus or click)</h2>
	<input id="money" type="text" value="0,00" placeholder="0,00" autocomplete="off">

	<h2>Copy and Paste Support</h2

	<p>Examples:</p>
	<ul>
		<li>5.866,72</li>
		<li>12345</li>
	</ul>

	<p>&nbsp;</p>

</body>
</html>