QUnit.test( "1,00", function( assert )
{
	assert.ok( _format(1) == "1,00", "Passed!" );
});

QUnit.test( "1,00", function( assert )
{
	assert.ok( _format(1.1) == "1,10", "Passed!" );
});

QUnit.test( "Empty string?", function( assert )
{
	assert.ok( _format("") == "", "Passed!" );
});

QUnit.test( "678.361,37", function( assert )
{
	assert.ok( _format(678361.37) == "678.361,37", "Passed!" );
});
