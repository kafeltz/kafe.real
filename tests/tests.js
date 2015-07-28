QUnit.start(function()
{
	
});

QUnit.test( "1,00", function( assert )
{
	assert.ok( _format(1) == "1,00", "Passed!" );
});

QUnit.test( "2,234", function( assert )
{
	assert.ok( _format(2.234) == "2,23", "Passed!" );
});

QUnit.test( "3,339", function( assert )
{
	assert.ok( _format(3.34) == "3,34", "Passed!" );
});

QUnit.test( "Not typeof number?", function( assert )
{
	assert.throws( _format(""), "Passed!" );
});

QUnit.test( "undefined", function( assert )
{
	assert.throws( _format(), "Passed!" );
});
