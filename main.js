const regExp = /[a-z]/i
console.log(regExp, typeof (regExp));


// i: case-insensitive
// g: global: the search looks for all matches, without it – only the first match is returned.
// m: multiline: \n match $...^
// s: dotall: the symbol '.' match \n
// u: full unicode support
// y: sticky The flag y makes regexp.exec to search exactly at position lastIndex, not “starting from” it.
// d: debug: after Regexp.prototype.exec, the res.indices array contains the indices of the match.


//regExp.lastIndex:
//it will use lastIndex if y set or g set. Otherwise lastIndex will be 0.

//regExp.test(str)-->bool
//regExp.exec(str)-->array

//string.match(regexp)
//string.matchAll(regexp)
//string.replace(regexp, newSubStr)
//string.replaceAll(regexp, newSubStr)
//string.search(regexp)-->index
//string.split(regexp)-->array

let match
match = "We will, we will rock you".match(/we/gi);
console.dir(match);

match = "We will, we will rock you".match(/we/i);
console.dir(match);

match = "We will, we will rock you".match(/ww/i);
console.dir(match);

"We will, we will".replace(/we/i, "I"); // I will, we will
"We will, we will".replace(/we/ig, "I"); // I will, I will

//CHEATSHEET
// $&	    inserts the whole match
// $`	    inserts a part of the string before the match
// $'	    inserts a part of the string after the match
// $n	    if n is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter Capturing groups
// $<name>	inserts the contents of the parentheses with the given name, more about it in the chapter Capturing groups
// $$	    inserts character $

console.log(/we/.test("Wewe")); //true

console.dir("A B".match(/A.B/))
console.dir("A\nB".match(/A.B/))
console.dir("A\nB".match(/A.B/s))

console.log('😄'.length, 'a'.length)// 2 1
//utf8 could be 1byte, 2byte, 3byte, 4byte
//https://en.wikipedia.org/wiki/UTF-8

//no match this
//\p{} means a character class: \p{L} = \p{Letter}

//wrong: console.log('一加'.match(/\p{L}/g));
console.log('一加'.match(/\p{L}/gu));
console.log("number: xAF".match(/x\p{Hex_Digit}\p{Hex_Digit}/u));
console.log(`Hello Привет 你好 123_456`.match(/\p{sc=Han}/gu));
console.log(`Prices: $2, €1, ¥9`.match(/\p{Sc}\d/gu))

match = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`.match(/^\d/g)
console.log(match);
match = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`.match(/^\d/gm)
console.log(match);

//NOTE: \b only works in english!
console.log("alice15@gmail.com".match(/[^\d\sA-Z]/gi))

//NOTE: no need escape
console.log("1 + 2 - 3".match(/[-().^+]/g));
//NOTE: must escape!
console.log("1 + 2 - 3".match(/[\\\-]/g));

// greedy (default)
//NOTE: In the greedy mode (by default) a quantified character is repeated as many times as possible. lazy mode vise versa
console.log('a "witch" and her "broom" is one'.match(/".+"/g));
// greedy with boundary
console.log('a "witch" and \n her "broom" is one'.match(/".+"/g));
// lazy
console.log('a "witch" and her "broom" is one'.match(/".+?"/g));

console.log("123 456".match(/\d+ \d+?/));

//think about this!
'a "witch" and her "broom" is one'.match(/"[^"]+"/g);

//match[0] :whole match
//match[1...] :groups

//group number based on left parenthesis order
let res = "aaabbb".match(/((aa)(bb))(b)/)
console.log(res);

console.log('Gogogo now!'.match(/(go)+/i));
console.log('ac'.match(/a(z)?(c)?/));//'ac',undefined,'c'
console.log('ac'.match(/a(z)?(c)?/));//'ac',undefined,'c'

match = 'ac'.match(/a(?<named_group>c)?/);//named group
console.log(match.groups, match.groups.named_group);

//matchAll
console.log(Array.from('<h1> <h2>'.matchAll(/<(.*?)>/gi)));//matchAll return an iter

match = "2019-10-30 2020-01-01".matchAll(/(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g);
for (let m of match) {
    let {year, month, day} = m.groups;
    console.log(`${day}.${month}.${year}`)
}

//replace
console.log("John Bull".replace(/(\w+) (\w+)/, "$2--$1"))

//(?:) drop group
console.log("Gogogo John!".match(/(?:go)+ (\w+)/i));

//backref: \1, \2, \3... or \k<group_name>
console.log(`He said: "She's the one!".`.match(/(['"])(.*?)\1/g));
console.log(`He said: "She's the one!".`.match(/(?<quote>['"])(.*?)\k<quote>/g));

//OR op
console.log("First HTML appeared, then CSS, then JavaScript".match(/html|php|css|java(script)?/gi));
console.log("00:00 10:10 23:59 25:99 1:2".match(/([01]\d|2[0-3]):[0-5]\d/g));
console.log(
    `
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]
`.match(/\[(?<tag>b|url|quote)\](.+?)\[(\/\k<tag>)\]/g)
)

//positive(true) lookahead(->)
console.log("1 turkey costs 30€".match(/\d+(?=€)/));
console.log("1 turkey costs 30€".match(/\d+(?=\s)(?=.*30)/));
//negative(false) lookahead(->)
console.log("2 turkeys cost 60€".match(/\d+\b(?!€)/g));
//positive(true) lookbehind(<-)
console.log("1 turkey costs $30".match(/(?<=\$)\d+/g));
//positive(false) lookbehind(<-)
console.log("2 turkeys cost $60".match(/(?<!\$)\b\d+/g));
//with capture group
console.log("1 turkey costs $30".match(/(?<=(\$|£))\d+/));
//NOTE: lookahead and lookbehind group also will be deprecated

//example
let regexp = /(?<=(<body\s.*?>)).*(?=<\/body>)/s;
let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;
console.log(str.match(regexp));
console.log(str.replace(regexp, `<h1>Hello</h1>`));

// VERY BAD EXAMPLE! take infinite time to run! think why?
// 阶乘级膨胀，会尝试完所有的排列组合，lazy mode isn't working
// in the worst situation the complicity is O(n!)
// console.log("012345678901234567890123456789z".match(/^(\d+)*$/));
// console.log("An input string that takes a long time or even makes this regexp hang!".match(/^(\w+\s?)*$/))

//fix
console.log("An input string that takes a long time or even makes this regexp hang!".match(/^(\w+\s)*\w*$/))


console.log("JavaScript".match(/\w+Script/)); // JavaScript
//NOTE: this pattern prevents backtrack
console.log("JavaScript".match(/(?=(\w+))\1Script/)); // null

//final fix
console.log("An input string that takes a long time or even makes this regexp hang!".match(/^((?=(\w+))\2\s?)*$/))


//sticy y
str = 'let varName = "value"';

regexp = /\w+/y;

regexp.lastIndex = 3;
console.log(regexp.exec(str)); // null (there's a space at position 3, not a word)

regexp.lastIndex = 4;
console.log(regexp.exec(str)); // varName (word at position 4)

// Imagine, we have a long text, and there are no matches in it, at all. Then a search with flag g will go till the end of the text and find nothing, and this will take significantly more time than the search with flag y, that checks only the exact position.

// https://javascript.info/regexp-methods
str = "I love JavaScript";
console.log(str.match(/Java(Script)/));
console.log(str.match(/Java(Script)/g));
console.log(Array.from(str.matchAll(/Java(Script)/g)));

console.log('12-34-56'.split('-'));//output: ['12', '34', '56']
console.log('12, 34, 56'.split(/,\s*/));//output: ['12', '34', '56']

console.log("A drop of ink may make a million think".search(/ink/i));

//When the first argument of replace is a string, it only replaces the first match.
console.log('12-34-56'.replace("-", ":"))
console.log('12-34-56'.replaceAll("-", ":"));
console.log('12-34-56'.replace(/-/g, ":"));

// func(match, p1, p2, ..., pn, offset, input, groups)
// p1, p2, ..., pn – contents of capturing groups (if there are any),
console.log("html and css".replace(/html|css/gi, str => str.toUpperCase()));
console.log("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset));
console.log("John Smith".replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`));
console.log("John Smith".replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`));
console.log(
    "John Smith".replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
        let groups = match.pop();

        return `${groups.surname}, ${groups.name}`;
    })
)

//exec
// If there’s no g, then regexp.exec(str) returns the first match exactly as str.match(regexp). This behavior doesn’t bring anything new.
// with g:
// A call to regexp.exec(str) returns the first match
// and Saves the position immediately after it in the property regexp.lastIndex.

str = 'More about JavaScript at https://javascript.info';
regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
    console.log(`Found ${result[0]} at position ${result.index}`);
}


regexp = /love/i
regexp.test("Lovey")
//should reset for next testing
regexp.lastIndex = 0
