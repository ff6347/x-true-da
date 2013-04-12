// {
/**
 * My simple extruder
 */

// Copyright (c)  2013
// Fabian "fabiantheblind" Morón Zirfas
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to
// whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// see also http://www.opensource.org/licenses/mit-license.php


run_x_true_da(this);

 function run_x_true_da(thisObj){

// this is global
xtruda =  {
  setting1 : false,
  setting2 : false,
  myArray :[],
  counter : 0
};


///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW  
var win   = buildUI(thisObj );
if ((win !== null) && (win instanceof Window)) {
    win.center();
    win.show();
} // end if win  null and not a instance of window 

 function buildUI (thisObj  ) {
    var win = (thisObj instanceof Panel) ? thisObj :  new Window('palette', 'example with proto',[0,0,150,260],{resizeable: true});

    if (win !== null) {

        var H = 25; // the height
        var W1 = 30; // the width
        var G = 5; // the gutter
        var x = G;
        var y = G;
        // var yuioff = G; // and some offset

        win.check_box = win.add('checkbox',[x,y,x+W1*2,y + H],'precompose?');
        win.check_box.value = xtruda.setting1;
        win.xtrude_button = win.add('button', [x + W1*5+ G,y,x + W1*6,y + H], 'Up');

        win.xtrude_button.onClick = function () {
            xtrude_it();
        };


    }
    return win;
}


function xtrude_it(){
// "in function main. From here on it is a straight run"
    }
 } // close run_x_true_da

// }