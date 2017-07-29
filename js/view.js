function setButtonClick(){
    setGame($("#selectBaseNumberOfSurvivors").val(), $("#selectActualNumberOfSurvivors").val(), $("#checkboxZombieDeckBlackPlague").is(':checked'));
    $("#spanCardsCountTotal").html(zombieDeck.length);
    $("#spanCardsCountCurrent").html(zombieDeck.length);
    $("#selectBaseNumberOfSurvivors").prop('disabled', true);
    $("#selectActualNumberOfSurvivors").prop('disabled', true);
    $("#checkboxZombieDeckBlackPlague").prop('disabled', true);
    $("#buttonSet").hide();
    $("#buttonStartNewGame").show();
    $("#radioDangerLevelBlue").prop("checked", true)
    $("#selectNumberOfspawnZones").val(1);
    $("#divSpawnPlaceholder").empty();
    $("#divSpawn").show();
}

function startNewGameButtonClick(){
    $("#selectBaseNumberOfSurvivors").prop('disabled', false);
    $("#selectActualNumberOfSurvivors").prop('disabled', false);
    $("#checkboxZombieDeckBlackPlague").prop('disabled', false);
    $("#buttonSet").show();
    $("#buttonStartNewGame").hide();
    $("#divSpawn").hide();
}

function spawnButtonClick(){
    let divSpawnPlaceHolder = $("#divSpawnPlaceholder");
    let dangerLevel = parseInt($('input[name=radioDangerLevel]:checked').val());
    let numberOfSpawnZones = $("#selectNumberOfspawnZones").val();
    let spawnZones = spawnZombies(numberOfSpawnZones);
    $("#spanCardsCountCurrent").html(zombieDeck.length);
    divSpawnPlaceHolder.empty();
    for(let i = 0; i < spawnZones.length; i++){
        let spawnZone = spawnZones[i];
        let divSpawnZone = $("<div>", {class: ""}).html(writeSpawnZoneHtml(i + 1));
        divSpawnPlaceHolder.append(divSpawnZone, "<br>");
        if(spawnZone != null){
        for(let card of spawnZone){
            let divSpawn = $("<div>", {class: ""}).html(writeSpawnHtml(card, dangerLevel));
            divSpawn.appendTo(divSpawnZone);
        }
        }else{
        let divSpawn = $("<div>", {class: ""}).html(writeSpawnHtml(null, null));
        divSpawn.appendTo(divSpawnZone);
        }
    }
}

function writeSpawnZoneHtml(spawnZoneNumber){
    return "<u>---Spawn Zone " + spawnZoneNumber + "---</u>";
}

function writeSpawnHtml(card, dangerLevel){
    let html;
    if(card != null){
        let spawn = getSpawnFromCard(card, dangerLevel);
        html = card.number + ": ";
        switch(card.spawnType){
        case SpawnTypeEnum.normalSpawn:
            if(spawn != null){
                switch(spawn.zombieType){
                case ZombieTypeEnum.walker:
                    html += "Walker";
                    break;
                case ZombieTypeEnum.fatty:
                    html += "Fatty";
                    break;
                case ZombieTypeEnum.runner:
                    html += "Runner";
                    break;
                case ZombieTypeEnum.abomination:
                    html += "Abomination";
                    break;
                }
                html += " x " + spawn.quantity;
            }else{
                html += "Nothing";
            }
            break;
        case SpawnTypeEnum.extraActivation:
            html += "Extra activation - ";
            if(spawn != null){
                switch(spawn.zombieType){
                case ZombieTypeEnum.walker:
                    html += "All Walkers";
                    break;
                case ZombieTypeEnum.fatty:
                    html += "All Fatties";
                    break;
                case ZombieTypeEnum.runner:
                    html += "All Runners";
                    break;
                }
            }else{
                html += "No one";
            }
            break;
        case SpawnTypeEnum.doubleSpawn:
            html += "Double spawn";
            break;
        case SpawnTypeEnum.necromancerSpawn:
            html += "Necromancer";
            break;
        }
    }else{
        html = "<i>skipped for balance with fewer survivors</i>";
    }
    return html;
}