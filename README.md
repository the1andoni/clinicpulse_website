[![Deploy website](https://github.com/the1andoni/clinicpulse_website/actions/workflows/pages.yml/badge.svg)](https://github.com/the1andoni/clinicpulse_website/actions/workflows/pages.yml)

# Medora Website

Statische Website für GitHub Pages. Sie stellt Medora, die vom Lizenzmanager veröffentlichten Pakete und ein Kontaktformular vor. Das Formular öffnet das lokale E-Mail-Programm; es versendet selbst keine Nachricht und benötigt keinen Formulardienst.

## Veröffentlichung

1. Dateien auf den Branch `main` des Repositories `the1andoni/clinicpulse_website` übertragen.
2. Unter **Settings → Pages → Build and deployment** als Quelle **GitHub Actions** wählen. Der Workflow veröffentlicht jeden Push auf `main`. Die Adresse lautet üblicherweise `https://the1andoni.github.io/clinicpulse_website/`.
3. Ob Pages für private Repositories verfügbar ist, hängt vom GitHub-Tarif ab. Alle Inhalte und Paketpreise sind auf einer öffentlichen Website öffentlich.
4. Vor öffentlicher Nutzung die erforderlichen Anbieter- und Datenschutzhinweise ergänzen und rechtlich prüfen lassen.

## Paket-Synchronisierung

Der Lizenzmanager schreibt bei Änderungen aktivierter und deaktivierter Modelle den vollständigen öffentlichen Katalog nach `packages.json` in `main`. Ein GitHub-Push startet den Pages-Workflow; bis zur Veröffentlichung kann es einige Minuten dauern. Es werden nur aktivierte Modelle und ihre Namen, Codes, Limits, Funktionen, Preise, Währung und Abrechnungsinformationen veröffentlicht; keine Kunden- oder Lizenzdaten. `0` wird als Preis von null angezeigt. Ein Einmalkaufpreis von `0` bedeutet, dass kein Einmalkauf angeboten wird.

Die Website gruppiert Pakete anhand ihres Codes: `ILS_…` unter ILS, `EMS_…` unter EMS / Rettungsdienst und `Hospital_…` unter Hospital Enterprise. Pakete mit anderen oder fehlenden Codes erscheinen unter „Weitere Pakete“. Innerhalb jeder Gruppe sortiert sie nach dem monatlichen Durchschnittspreis aufsteigend.

Im Lizenzmanager `WEBSITE_GITHUB_TOKEN` als separates, fein abgestuftes GitHub-Token mit **Contents: read and write** ausschließlich für dieses Repository konfigurieren und den Dienst neu erstellen. Das Token muss auf `main` schreiben können; Branch-Schutzregeln können das verhindern. Ein persönliches Token (nicht das automatische Actions-`GITHUB_TOKEN`) ist nötig, damit der Push einen Workflow auslöst. Das Token niemals in dieses Repository oder in die Website schreiben. Danach im Lizenzmanager **Website synchronisieren** wählen, um bestehende Pakete erstmals zu veröffentlichen. Das Repository muss bereits einen `main`-Branch und den Workflow enthalten.

Änderungen werden zuerst im Lizenzmanager gespeichert. Schlägt die GitHub-Synchronisierung fehl, zeigt der Manager eine Warnung; anschließend dort **Erneut synchronisieren** wählen. Es gibt keine automatische Wiederholung. Der Abgleich ist für eine einzelne Lizenzmanager-Instanz mit einem Serverprozess ausgelegt. Bei mehreren Prozessen oder Instanzen ist eine prozessübergreifende Synchronisierung erforderlich.

Lokal kann die Website beispielsweise mit `python3 -m http.server 8000` oder einem anderen statischen HTTP-Server geöffnet werden. Direktes Öffnen der HTML-Datei kann das Laden der JSON-Datei verhindern.
