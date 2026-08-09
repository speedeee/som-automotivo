addEventHandler("onClientResourceStart", resourceRoot, function()
    local txdCaixa = engineLoadTXD("caixa.txd")
    engineImportTXD(txdCaixa, 1337)
    local dffCaixa = engineLoadDFF("caixa.dff")
    engineReplaceModel(dffCaixa, 1337)

    local txdSkin = engineLoadTXD("skin.txd")
    engineImportTXD(txdSkin, 0)
    local dffSkin = engineLoadDFF("skin.dff")
    engineReplaceModel(dffSkin, 0)
end)

function tocarSomCarro()
    local veh = getPedOccupiedVehicle(localPlayer)
    if veh then
        local x, y, z = getElementPosition(veh)
        local sound = playSound3D("som.mp3", x, y, z, true)
        setSoundMaxDistance(sound, 50)
        attachElements(sound, veh)
    end
end
addCommandHandler("som", tocarSomCarro)
