### Working on this problem set:

Write a program that reads a large list of English words (e.g. from /usr/share/dict/words on a unix system) into memory, and then reads words from stdin, and prints either the best spelling suggestion, or "NO SUGGESTION" if no suggestion can be found. The program should print ">" as a prompt before reading each word, and should loop until killed.

Your solution should be faster than O(n) per word checked, where n is the length of the dictionary. That is to say, you can't scan the dictionary every time you want to spellcheck a word.

For example:
<pre>
> sheeeeep
sheep
> peepple
people
> sheeple
NO SUGGESTION
</pre>

The class of spelling mistakes to be corrected is as follows:

Case (upper/lower) errors: "inSIDE" => "inside"
Repeated letters: "jjoobbb" => "job"
Incorrect vowels: "weke" => “wake"

Any combination of the above types of error in a single word should be corrected (e.g. "CUNsperrICY" => "conspiracy”).

If there are many possible corrections of an input word, your program can choose one in any way you like. It just has to be an English word that is a spelling correction of the input by the above rules.

Final step: Write a second program that *generates* words with spelling mistakes of the above form, starting with correctly spelled English words. Pipe its output into the first program and verify that there are no occurrences of "NO SUGGESTION" in the output.


###My notes:
I first began by reading /usr/share/dict/words into an array and checking inputted words against the dictionary using the `indexOf()` method.  That of course is O(n) and not useful in this context.

Next, I decided to load all the words into a hash table, which had the benefit of being O(1) but not allowing checks against partial words.

Ultimately, after some research I learned about the Trie data structure and found a decent library that I was able to use to implment that structure.  That is the current state of the app.  The app is able to correct for caps (easy) and for the first instance of an improper vowel.  I was unable to determine how to account for both the vowels and excessive repeating characters.  

Other hightlights:
- suppressed the prompt when the app is running non-interactively
- load the dictionary at the first check when running interactively, but once it's in memory, further checks are run against the dictionary in memory.
-
