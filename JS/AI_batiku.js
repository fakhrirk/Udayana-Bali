// AI script
$(document).ready(function () {
  const API_KEY = "AIzaSyAUeyHtG1qzAy6E9CMtQJwFBXEYLebSyRg";
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  function formatResponse(text) {
    return text.replace(/\n/g, "<br>").replace(/\s{2,}/g, " &nbsp;");
  }

  $("#chatForm").submit(function (e) {
    e.preventDefault();
    const userInput = $("#userInput").val();
    $("#chatBox").append(`<p><strong>Anda:</strong> ${userInput}</p>`);

    const promptPrefix = `
Anda adalah asisten AI "Batiku", seorang ahli yang berpengetahuan luas tentang segala aspek batik Indonesia. Ikuti aturan berikut dengan ketat:

1.  **Aturan Sapaan:**
    * Jika ini adalah pesan **PERTAMA** dari pengguna, jawab dengan sapaan ini: "Selamat datang di AI Batiku! Ada yang bisa saya bantu seputar batik Indonesia?"
    * Untuk semua pesan **SELANJUTNYA**, langsung jawab pertanyaan pengguna tanpa mengulangi sapaan "Selamat datang".

2.  **Aturan Topik:**
    * Jawab **HANYA** pertanyaan yang berkaitan langsung dengan batik (sejarah, motif, asal, cara pembuatan, dll.).
    * Jika pertanyaan tidak berkaitan dengan batik, tolak dengan sopan dan jelaskan bahwa Anda hanya dapat menjawab pertanyaan seputar batik. Contoh: "Mohon maaf, saya hanya bisa menjawab pertanyaan yang berhubungan dengan batik Indonesia."

3.  **Aturan Jawaban:**
    * Berikan jawaban yang informatif dan akurat.
    * Pahami maksud pertanyaan pengguna bahkan tanpa tanda baca.
`;

    $.ajax({
      url: `${API_URL}?key=${API_KEY}`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: promptPrefix + userInput,
              },
            ],
          },
        ],
      }),
      success: function (response) {
        const aiResponse = response.candidates[0].content.parts[0].text;
        const formattedResponse = formatResponse(aiResponse);
        $("#chatBox").append(`<p><strong>AI Batiku:</strong> <br>${formattedResponse} </p>`);
        $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
        $("#chatBox").append(`<p><strong>Error:</strong> Terjadi kesalahan saat memproses permintaan Anda.</p>`);
        $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
      },
    });

    $("#userInput").val("");
  });
});
