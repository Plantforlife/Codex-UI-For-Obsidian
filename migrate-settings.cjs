"use strict";
const fs = require("node:fs");
const path = require("node:path");

const prefix = "codex-theme@@";
const colors = ["red", "orange", "yellow", "green", "cyan", "blue", "violet"];
const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

function migrateSettings(input) {
  const output = { ...input };
  for (const color of colors) {
    for (const mode of ["light", "dark"]) {
      const oldKey = `${prefix}codex-folder-${color}@@${mode}`;
      const newKey = `${prefix}codex-folder-${color}-${mode}`;
      if (!has(output, oldKey)) continue;
      const value = output[oldKey];
      if (!has(output, newKey) && typeof value === "string" && value.trim()) output[newKey] = value;
      delete output[oldKey];
    }
  }
  const oldMarkerKey = prefix + "codex-hide-folder-lines";
  const markerKey = prefix + "codex-folder-markers";
  if (has(output, oldMarkerKey)) {
    if (!has(output, markerKey) && typeof output[oldMarkerKey] === "boolean") output[markerKey] = !output[oldMarkerKey];
    delete output[oldMarkerKey];
  }
  delete output[prefix + "codex-hide-folder-icons"];
  return output;
}

if (require.main === module) {
  if (!process.argv[2]) {
    console.error('Usage: node migrate-settings.cjs <Style Settings data.json>');
    process.exit(1);
  }
  const settingsFile = path.resolve(process.argv[2]);
  const original = fs.readFileSync(settingsFile, "utf8");
  const data = JSON.parse(original);
  const migrated = migrateSettings(data);
  if (JSON.stringify(data) === JSON.stringify(migrated)) {
    console.log("Style Settings already compatible; no data changed.");
  } else {
    const backupFile = `${settingsFile}.backup-${Date.now()}`;
    fs.writeFileSync(backupFile, original, { flag: "wx" });
    fs.writeFileSync(settingsFile, JSON.stringify(migrated, null, 2) + "\n");
    console.log(`Migrated Codex settings; original saved to ${backupFile}`);
  }
}

module.exports = { migrateSettings };
