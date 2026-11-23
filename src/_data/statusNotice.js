// Current notice on the Pinfinity Pinferno! server status page (/<lang>/status/).
// This is the only file to edit for a maintenance or outage notice; merging to main deploys it in a few minutes.
//   updated  when the notice was written, shown as is, e.g. "2026-11-23 15:00 KST". "" hides the line.
//   <lang>   { title, lines }: a heading and one paragraph per line. A language left out shows English,
//            then Korean. With no ko entry at all, the page says there is no notice right now.
// Example:
//   ko: { title: "11월 25일 정기 점검", lines: ["점검 시간: 11월 25일(수) 10:00–12:00 (KST)", "점검이 끝나면 우편함으로 보상을 보내 드려요."] },
module.exports = {
  updated: "",
  ko: null,
  en: null
};
