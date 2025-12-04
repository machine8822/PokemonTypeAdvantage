// Pokémon types list
const types = [
    "Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground",
    "Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"
];

// Effectiveness data: attackType > defenseType = multiplier
const chart = {
    Normal:    { Rock:0.5, Ghost:0, Steel:0.5 },
    Fire:      { Fire:0.5, Water:0.5, Grass:2, Ice:2, Bug:2, Rock:0.5, Dragon:0.5, Steel:2 },
    Water:     { Fire:2, Water:0.5, Grass:0.5, Ground:2, Rock:2, Dragon:0.5 },
    Electric:  { Water:2, Electric:0.5, Grass:0.5, Ground:0, Flying:2, Dragon:0.5 },
    Grass:     { Fire:0.5, Water:2, Grass:0.5, Poison:0.5, Ground:2, Flying:0.5, Bug:0.5, Rock:2, Dragon:0.5, Steel:0.5 },
    Ice:       { Fire:0.5, Water:0.5, Grass:2, Ground:2, Flying:2, Dragon:2, Steel:0.5 },
    Fighting:  { Normal:2, Ice:2, Poison:0.5, Flying:0.5, Psychic:0.5, Bug:0.5, Rock:2, Ghost:0, Dark:2, Steel:2, Fairy:0.5 },
    Poison:    { Grass:2, Poison:0.5, Ground:0.5, Rock:0.5, Ghost:0.5, Steel:0, Fairy:2 },
    Ground:    { Fire:2, Electric:2, Grass:0.5, Poison:2, Flying:0, Bug:0.5, Rock:2, Steel:2 },
    Flying:    { Electric:0.5, Grass:2, Fighting:2, Bug:2, Rock:0.5, Steel:0.5 },
    Psychic:   { Fighting:2, Poison:2, Psychic:0.5, Dark:0, Steel:0.5 },
    Bug:       { Fire:0.5, Grass:2, Fighting:0.5, Poison:0.5, Flying:0.5, Psychic:2, Ghost:0.5, Dark:2, Steel:0.5, Fairy:0.5 },
    Rock:      { Fire:2, Ice:2, Fighting:0.5, Ground:0.5, Flying:2, Bug:2, Steel:0.5 },
    Ghost:     { Normal:0, Psychic:2, Ghost:2, Dark:0.5 },
    Dragon:    { Dragon:2, Steel:0.5, Fairy:0 },
    Dark:      { Fighting:0.5, Psychic:2, Ghost:2, Dark:0.5, Fairy:0.5 },
    Steel:     { Fire:0.5, Water:0.5, Electric:0.5, Ice:2, Rock:2, Steel:0.5, Fairy:2 },
    Fairy:     { Fire:0.5, Fighting:2, Poison:0.5, Dragon:2, Dark:2, Steel:0.5 }
};

// Populate dropdowns
const type1Select = document.getElementById("type1");
const type2Select = document.getElementById("type2");
const resultBox = document.getElementById("results");

types.forEach(type => {
    type1Select.innerHTML += `<option value="${type}">${type}</option>`;
    type2Select.innerHTML += `<option value="${type}">${type}</option>`;
});

// Calculate effectiveness
function calculate() {
    const t1 = type1Select.value;
    const t2 = type2Select.value;
    let output = "";

    types.forEach(attackingType => {
        let multiplier = 1;

        if (chart[attackingType]?.[t1]) multiplier *= chart[attackingType][t1];
        if (t2 && chart[attackingType]?.[t2]) multiplier *= chart[attackingType][t2];

        if (multiplier > 1) {
            output += `<div class="good">${attackingType}: ${multiplier}x damage</div>`;
        } else if (multiplier === 0) {
            output += `<div class="immune">${attackingType}: No effect</div>`;
        } else if (multiplier < 1) {
            output += `<div class="bad">${attackingType}: ${multiplier}x damage</div>`;
        }
    });

    resultBox.innerHTML = output || "Please choose at least one type.";
}

// Button listener
document.getElementById("calcBtn").addEventListener("click", calculate);

