// AI script
$(document).ready(function () {
  const API_KEY = "AIzaSyCIPirJ1FAabCRcmu6kF-oyMR5v10C42HU";
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  function formatResponse(text) {
    return text.replace(/\n/g, "<br>").replace(/\s{2,}/g, " &nbsp;");
  }

  $("#chatForm").submit(function (e) {
    e.preventDefault();
    const userInput = $("#userInput").val();
    $("#chatBox").append(`<p><strong>Anda:</strong> ${userInput}</p>`);

    const promptPrefix =
      "Anda adalah asisten AI yang ahli dalam batik Indonesia. Jawablah pertanyaan berikut ini hanya jika berkaitan dengan batik. Jika pertanyaan tidak berkaitan dengan batik, mohon beri tahu pengguna bahwa Anda hanya dapat menjawab pertanyaan seputar batik. Jika user menyapa maka jawab selamat datang di halaman AI batiku, apakah ada yang ingin ditanyakan tentang batik ?. Anda adalah asisten AI yang tau jenis kalimat yang user beri tanpa membutuhkan simbol-simbol pada kalimat. Jika telah menjawab pertanyaan user jangan mengulang kata selamat datang. Pertanyaan: ";

    $.ajax({
      url: `${API_URL}?key=${API_KEY}`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: userInput + promptPrefix + userInput,
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
