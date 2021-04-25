$champ_de_saisi = $("#champ-recherche");

// Auto-complétion

// liste de héros disponible dans la liste proposée :

function actualiser_autocomplete(){

  var availableHeroes = [localStorage.length];

  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    availableHeroes[i] = localStorage.getItem( localStorage.key( i ) ) ;
    }


    $champ_de_saisi.autocomplete({
          source: availableHeroes
        });
}
