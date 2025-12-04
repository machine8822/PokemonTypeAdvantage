window.addEventListener("DOMContentLoaded", () => {

    const types = [
        "Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground",
        "Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"
    ];

    const chart = {
        Normal: { Rock:0.5, Ghost:0, Steel:0.5 },
        Fire: { Fire:0.5, Water:0.5, Grass:2, Ice:2, Bug:2, Rock:0.5, Dragon:0.5, Steel:2 },
        Water: { Fire:2, Water:0.5, Grass:0.5, Ground:2, Rock:2, Dragon:0.5 },
        Electric: { Water:2, Electric:0.5, Grass:0.5, Ground:0, Flying:2, Dragon:0.5 },
        Grass: { Fire:0.5, Water:2, Grass:0.5, Poison:0.5, Ground:2, Flying:0.5, Bug:0.5, Rock:2, Dragon:0.5, Steel:0.5 },
        Ice: { Fire:0.5, Water:0.5, Grass:2, Ground:2, Flying:2, Dragon:2, Steel:0.5 },
        Fighting: { Normal:2, Ice:2, Poison:0.5, Flying:0.5, Psychic:0.5, Bug:0.5, Rock:2, Ghost:0, Dark:2, Steel:2, Fairy:0.5 },
        Poison: { Grass:2, Poison:0.5, Ground:0.5, Rock:0.5, Ghost:0.5, Steel:0, Fairy:2 },
        Ground: { Fire:2, Electric:2, Grass:0.5, Poison:2, Flying:0, Bug:0.5, Rock:2, Steel:2 },
        Flying: { Electric:0.5, Grass:2, Fighting:2, Bug:2, Rock:0.5, Steel:0.5 },
        Psychic: { Fighting:2, Poison:2, Psychic:0.5, Dark:0, Steel:0.5 },
        Bug: { Fire:0.5, Grass:2, Fighting:0.5, Poison:0.5, Flying:0.5, Psychic:2, Ghost:0.5, Dark:2, Steel:0.5, Fairy:0.5 },
        Rock: { Fire:2, Ice:2, Fighting:0.5, Ground:0.5, Flying:2, Bug:2, Steel:0.5 },
        Ghost: { Normal:0, Psychic:2, Ghost:2, Dark:0.5 },
        Dragon: { Dragon:2, Steel:0.5, Fairy:0 },
        Dark: { Fighting:0.5, Psychic:2, Ghost:2, Dark:0.5, Fairy:0.5 },
        Steel: { Fire:0.5, Water:0.5, Electric:0.5, Ice:2, Rock:2, Steel:0.5, Fairy:2 },
        Fairy: { Fire:0.5, Fighting:2, Poison:0.5, Dragon:2, Dark:2, Steel:0.5 }
    };

    const type1Select = document.getElementById("type1");
    const type2Select = document.getElementById("type2");
    const resultBox = document.getElementById("results");
    const calcBtn = document.getElementById("calcBtn");

    // Populate dropdowns
    type1Select.innerHTML = "";
    if (!type2Select.innerHTML.trim()) {
        type2Select.innerHTML = `<option value="">None</option>`;
    }

    types.forEach(type => {
        type1Select.innerHTML += `<option value="${type}">${type}</option>`;
        type2Select.innerHTML += `<option value="${type}">${type}</option>`;
    });

    //Determines type effectiveness
    function calculate() {
        const t1 = type1Select.value;
        const t2 = type2Select.value;

        let results = [];

        types.forEach(attackingType => {
            let multiplier = 1;
            if (chart[attackingType]?.[t1]) multiplier *= chart[attackingType][t1];
            if (t2 && chart[attackingType]?.[t2]) multiplier *= chart[attackingType][t2];
            results.push({ type: attackingType, mult: multiplier });
        });

        // Sort strongest → weakest
        results.sort((a, b) => b.mult - a.mult);

        let output = "";
        results.forEach(result => {
            let cssClass =
                result.mult > 1 ? "good" :
                result.mult === 0 ? "immune" :
                result.mult < 1 ? "bad" : "";

            output += `
                <div class="${cssClass}">
                    <img class="type-icon" src="icons/${result.type}.png" alt="${result.type}">
                    ${result.type}: ${result.mult === 0 ? "No effect" : result.mult + "x damage"}
                </div>
            `;
        });

        resultBox.innerHTML = output;
    }

    calcBtn.addEventListener("click", calculate);
});




