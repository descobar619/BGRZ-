
function restore_options() {
    chrome.storage.sync.get({
        BridgeServer: 'share1.dexcom.com',
        Units: 'mg/dL',
        UserName: '',
        Password: '',
        OMGsoHigh: '300',
        HighAF: '200',
        MaybeASnack: '50',
        LowAF: '100'
    }, function(items) {
        document.getElementById('BridgeServer').value = items.BridgeServer;
        document.getElementById('Units').value = items.Units;
        document.getElementById('UserName').value = items.UserName;
        document.getElementById('Password').value = items.Password;
        document.getElementById('OMGsoHigh').value = items.OMGsoHigh;
        document.getElementById('MaybeASnack').value = items.MaybeASnack;
        document.getElementById('HighAF').value = items.HighAF;
        document.getElementById('LowAF').value = items.LowAF;
    });
}

function save_options() {
    var BridgeServer = document.getElementById('BridgeServer').value;
    var Units = document.getElementById('Units').value;
    var UserName = document.getElementById('UserName').value;
    var Password = document.getElementById('Password').value;
    var OMGsoHigh = document.getElementById('OMGsoHigh').value;
    var HighAF = document.getElementById('HighAF').value;
    var MaybeASnack = document.getElementById('MaybeASnack').value;
    var LowAF = document.getElementById('LowAF').value;
    
    console.log("Saving options");

    chrome.storage.sync.set({
        BridgeServer: BridgeServer,
        Units: Units,
        UserName: UserName,
        Password: Password,
        OMGsoHigh: OMGsoHigh,
        HighAF: HighAF,
        MaybeASnack: MaybeASnack,
        LowAF: LowAF 
    }, function() {
        var background = chrome.extension.getBackgroundPage();
        background.units = Units;
        background.OMGsoHigh = OMGsoHigh;
        background.MaybeASnack = MaybeASnack;
        background.HighAF = HighAF;
        background.LowAF = LowAF;

        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
