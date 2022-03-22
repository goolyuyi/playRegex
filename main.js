const regExp = /[a-z]/i
console.log(regExp, typeof (regExp));

// i: case-insensitive
// g: default is first,
// With this flag the search looks for all matches, without it – only the first match is returned.
// m: \n match $/^
// s: 'dotall' dot match \n
// u: full unicode support
// y: sticky


//NOTE: read doc here
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
//NOTE: utf8 mix 8bit charset and 16bit charset

//no match this
//\p{} means a character class: \p{L} = \p{Letter}
console.log('一加'.match(/\p{L}/g));
console.log('一加'.match(/\p{L}/gu));
//NOTE: detail in cheatsheet
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

//NOTE: \b only works in english

// ^ exclude
console.log("alice15@gmail.com".match(/[^\d\sA-Z]/gi))

// no need escape
console.log("1 + 2 - 3".match(/[-().^+]/g));
// escape everything
console.log("1 + 2 - 3".match(/[\-\(\)\.\^\+]/g));

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
console.log('Gogogo now!'.match(/(go)+/i));
console.log('ac'.match(/a(z)?(c)?/));//'ac',undefined,'c'
console.log('ac'.match(/a(z)?(c)?/));//'ac',undefined,'c'

match = 'ac'.match(/a(?<cgroup>c)?/);//named group
console.log(match.groups);

//NOTE:matchAll
console.log(Array.from('<h1> <h2>'.matchAll(/<(.*?)>/gi)));//matchAll return an iter

//example
match = "2019-10-30 2020-01-01".matchAll(/(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g);
for (let m of match) {
    let {year, month, day} = m.groups;
    console.log(`${day}.${month}.${year}`)
}

console.log("John Bull".replace(/(\w+) (\w+)/, "$2--$1"))

//(?:) drop group
console.log("Gogogo John!".match(/(?:go)+ (\w+)/i));

//backref
console.log(`He said: "She's the one!".`.match(/(['"])(.*?)\1/g));
console.log(`He said: "She's the one!".`.match(/(?<quote>['"])(.*?)\k<quote>/g));

//OR op
console.log("First HTML appeared, then CSS, then JavaScript".match(/html|php|css|java(script)?/gi));
console.log("00:00 10:10 23:59 25:99 1:2".match(/([01]\d|2[0-3]):[0-5]\d/g));

//example
console.log(
    `
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]
`.match(/\[(?<tag>b|url|quote)](.+?)\[(\/\k<tag>)]/g)
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

//VERY BAD EXAMPLE!
// console.log("012345678901234567890123456789z".match(/^(\d+)*$/));

