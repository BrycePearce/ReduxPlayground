package main

import "fmt"
import "strconv"

// we can declare variables at the global level, but you have to use full syntax
var x int = 90

func main() {
	fmt.Println("Hello Go!")

	showPrintVars()
	convertVar()
	maps()
}

/*
 * Assigning variables
 */
func showPrintVars() {
	fmt.Println("Printing variables")
	// Method 1
	var a int
	a = 42
	fmt.Println(a)

	// Method 2 (GO compiler will infer that b is an int, so don't need to declare int)
	var b float32 = 42
	fmt.Println(b)

	// Method 3 (let GO compiler do all the work, this is the most common)
	c := 16
	fmt.Println(c)

	fmt.Println(x) // global value

	// Printing out var types
	fmt.Printf("%v, %T", c, c) // we can see the format of the value and type of the number. Note that GO compiler assigns c to be an int
}

func convertVar() {
	fmt.Println("\nConverting variable types")
	var i int = 42
	fmt.Printf("%v, %T\n", i, i)

	var j float32
	j = float32(i)
	fmt.Printf("%v, %T\n", j, j)

	var k string
	k = string(i)
	fmt.Printf("%v, %T\n", k, k) // outputs * string, which is the ascii for the number 42 as a string

	// Better to use the standard library to convert variable types, shown below:

	var n int = 30
	fmt.Printf("%v, %T\n", n, n)

	var p string
	p = strconv.Itoa(n)
	fmt.Printf("%v, %T\n", p, p)
}

func maps() {
	fmt.Println("\nCreating a map")

	statePopulations := map[string]int{ // map is type string, with integer values
		"California": 129494,
		"Texas":      27862596,
		"New York":   19418255910,
	}
	fmt.Println(statePopulations)
	fmt.Println(statePopulations["Texas"])
}
