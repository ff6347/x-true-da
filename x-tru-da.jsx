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
    'depth':50,
    'shadow':false,
    'foldername':'xtruded-stuff'
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
        var W = 30; // the width
        var G = 5; // the gutter
        var x = G;
        var y = G;
        // var yuioff = G; // and some offset
        win.depth_etxt = win.add('edittext',[x,y,x+W*2,y+H],String(xtruda.depth));
        x+=W*2+G;
        win.foldername_etxt = win.add('edittext',[x,y,x+W*6,y+H],xtruda.foldername);
        x+=W*4+G;
        y+=H;
        x=G;
        win.check_box = win.add('checkbox',[x,y,x+W*3,y + H],'precomp?');
        win.check_box.value = true;
        x+=W*3+G;
        win.xtrude_button = win.add('button', [x,y,x+W*5,y + H], 'X-Trude-It');

        win.xtrude_button.onClick = function () {
            xtrude_it();
        };
        win.depth_etxt.onChange = function  () {
            xtruda.depth = parseInt(this.text,10);
        };
        win.foldername_etxt.onChange = function  () {
            xtruda.foldername = this.text;
        };


    }
    return win;
}


function xtrude_it(){
// "in function main. From here on it is a straight run"

    var curComp = app.project.activeItem;
   if (!curComp || !(curComp instanceof CompItem)){
        alert('please select a comp');
        return;
    }

    if(curComp.selectedLayers.length < 1){
        alert('Please select at least one layer');
    return;
        }
    app.beginUndoGroup('X-True-Da');

        var xtrudefolder = app.project.items.addFolder('extruded-thingy');
    for (var i = 0; i < curComp.selectedLayers.length;i++){
        var layer = curComp.selectedLayers[i];
        layer_extruder(layer, xtrudefolder);
    }
    app.endUndoGroup();

    }

function layer_extruder(layer, folder){

var extruded_text = null;
var arrOLayers = [];
layer.threeDLayer = true;
// layer.collapseTransformation = true;
//layer.property("ADBE Material Options Group").property("ADBE Casts Shadows").setValue(1);
arrOLayers.push(layer);
    for(var z = 1; z < xtruda.depth;z++){

        var dupe = arrOLayers[z-1].duplicate();
        dupe.moveToEnd();
        var x  = dupe.transform.position.value[0];
        var y  = dupe.transform.position.value[1];
        dupe.threeDLayer = true;
        dupe.transform.position.setValue([x,y,z]);
        //dupe.property("ADBE Material Options Group").property("ADBE Casts Shadows").setValue(1);
        // dupe.parent = arrOLayers[0];
        if((z == xtruda.depth - 1) &&(xtruda.shadow === true)){
            dupe.property("ADBE Material Options Group").property("ADBE Casts Shadows").setValue(1);
        }
        arrOLayers.push(dupe);

    }// close z

extruded_text = precomper(
    arrOLayers,
    layer.containingComp,
    'new comp',
    folder);
extruded_text.threeDLayer = true;
extruded_text.collapseTransformation = true;


return extruded_text;
}

/*
my personal precomposer

*/
function precomper(arrOLayers,curComp, name, folder){

var layerIndices = []; // precompose takes layer inidcies
// loop thru a list of layer
for(var l = 0;l < arrOLayers.length;l++){
// and push their index into an array
    layerIndices[layerIndices.length] = arrOLayers[l].index;
  }

// now precompose the result       
var newComp = curComp.layers.precompose(layerIndices, name, true );
newComp.parentFolder = folder;
// it is the selected layer
var preCompedLayer = curComp.selectedLayers[0];
return preCompedLayer;
}
 } // close run_x_true_da
// }