
export function findVariationOptionFromVariations(varOpId, variations){
    let options = variations.variationOption;
    let result = options.filter((op)=> Number(op.id) === Number(varOpId)).at(0);
    return result;
}

export function alignImageInEditor(){
    let els = document.querySelectorAll(".descriptions .ql-editor img");
    els.forEach(el=>{
        if(el)
            el.parentNode.style.textAlign = "center";
    })
}

export function findVariationFromVariationOption(varOpId, variations){
    
}