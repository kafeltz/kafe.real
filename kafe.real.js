/**
*	v.1.0
*/

// http://blog.tompawlak.org/number-currency-formatting-javascript
// http://www.javascripter.net/faq/tofixed.htm
function _format(num)
{
    return num.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}