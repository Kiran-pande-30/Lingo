export const lessons = [
  {
    id: 1,
    title: "पहला दिन",
    subtitle: "First Day at Work/College",
    context: "तुम अभी-अभी Pune के एक नए office में join हुए हो। तुम्हारे colleagues Marathi बोलते हैं। पहले दिन के लिए ये 5 phrases काफी हैं।",
    phrases: [
      {
        marathi: "माझं नाव ___ आहे.",
        transliteration: "Maazha naav ___ aahe.",
        hindi: "मेरा नाम ___ है।"
      },
      {
        marathi: "मी नवीन आहे.",
        transliteration: "Mee naveen aahe.",
        hindi: "मैं नया/नई हूँ।"
      },
      {
        marathi: "आज माझा पहिला दिवस आहे.",
        transliteration: "Aaj maaza pahila divas aahe.",
        hindi: "आज मेरा पहला दिन है।"
      },
      {
        marathi: "मला थोडी मदत हवी आहे.",
        transliteration: "Mala thodi madat havi aahe.",
        hindi: "मुझे थोड़ी मदद चाहिए।"
      },
      {
        marathi: "तुमची भाषा मला नीट येत नाही.",
        transliteration: "Tumchi bhasha meta neet yet naahi.",
        hindi: "मुझे आपकी भाषा ठीक से नहीं आती।"
      }
    ],
    quiz: {
      question: "'मैं नया हूँ' को Marathi में कैसे कहते हैं?",
      options: ["मी नवीन आहे.", "मी थकलो आहे.", "मी जातो आहे.", "मी खातो आहे."],
      correct: 0
    },
    recall: {
      sentence: "मला थोडी ___ हवी आहे.",
      tiles: ["मदत", "वेळ", "पाणी"],
      correct: "मदत"
    }
  },
  {
    id: 2,
    title: "रास्ता पूछना",
    subtitle: "Asking Directions",
    context: "तुम एक नई जगह पर हो और रास्ता भूल गए हो। एक local आता है। ये phrases काम आएंगे।",
    phrases: [
      {
        marathi: "___ कुठे आहे?",
        transliteration: "___ kuthe aahe?",
        hindi: "___ कहाँ है?"
      },
      {
        marathi: "इथून किती दूर आहे?",
        transliteration: "Ithun kiti door aahe?",
        hindi: "यहाँ से कितना दूर है?"
      },
      {
        marathi: "मला ___ ला जायचं आहे.",
        transliteration: "Mala ___ la jaaycha aahe.",
        hindi: "मुझे ___ जाना है।"
      },
      {
        marathi: "डावीकडे की उजवीकडे?",
        transliteration: "Daavikade ki ujvikade?",
        hindi: "बाईं तरफ या दाईं तरफ?"
      },
      {
        marathi: "परत सांगाल का?",
        transliteration: "Parat saangaal ka?",
        hindi: "क्या फिर से बता सकते हैं?"
      }
    ],
    quiz: {
      question: "'कहाँ है?' को Marathi में कैसे कहते हैं?",
      options: ["कुठे आहे?", "कसे आहे?", "केव्हा आहे?", "कोण आहे?"],
      correct: 0
    },
    recall: {
      sentence: "इथून किती ___ आहे?",
      tiles: ["दूर", "जवळ", "मोठं"],
      correct: "दूर"
    }
  },
  {
    id: 3,
    title: "खाना-पानी",
    subtitle: "Food & Daily Needs",
    context: "एक local dhaba है। menu Marathi में है। vendor Hindi नहीं बोलता। ये phrases तुम्हें खाना दिला देंगे।",
    phrases: [
      {
        marathi: "मला ___ द्या.",
        transliteration: "Mala ___ dyaa.",
        hindi: "मुझे ___ दीजिए।"
      },
      {
        marathi: "किती पैसे झाले?",
        transliteration: "Kiti paise zaale?",
        hindi: "कितने पैसे हुए?"
      },
      {
        marathi: "हे काय आहे?",
        transliteration: "He kaay aahe?",
        hindi: "यह क्या है?"
      },
      {
        marathi: "तिखट नको.",
        transliteration: "Tikhat nako.",
        hindi: "तीखा नहीं चाहिए।"
      },
      {
        marathi: "पाणी मिळेल का?",
        transliteration: "Paani milel ka?",
        hindi: "पानी मिलेगा क्या?"
      }
    ],
    quiz: {
      question: "'कितने पैसे हुए?' को Marathi में कैसे कहते हैं?",
      options: ["किती पैसे झाले?", "काय हवं आहे?", "कुठे आहे?", "हे घ्या."],
      correct: 0
    },
    recall: {
      sentence: "पाणी ___ का?",
      tiles: ["मिळेल", "आहे", "नको"],
      correct: "मिळेल"
    }
  },
  {
    id: 4,
    title: "ऑफिस की बात",
    subtitle: "Workplace Talk",
    context: "Marathi बोलने वाले office में रोज़ काम होता है। ये वो phrases हैं जो हर दिन काम आते हैं।",
    phrases: [
      {
        marathi: "बैठक कधी आहे?",
        transliteration: "Baithak kadhi aahe?",
        hindi: "मीटिंग कब है?"
      },
      {
        marathi: "हे मला समजलं नाही.",
        transliteration: "He mala samajla naahi.",
        hindi: "यह मुझे समझ नहीं आया।"
      },
      {
        marathi: "मी उद्या येणार नाही.",
        transliteration: "Mee udya yenaar naahi.",
        hindi: "मैं कल नहीं आऊँगा/आऊँगी।"
      },
      {
        marathi: "काम झालं.",
        transliteration: "Kaam zaala.",
        hindi: "काम हो गया।"
      },
      {
        marathi: "थोडा वेळ आहे का?",
        transliteration: "Thoda vel aahe ka?",
        hindi: "थोड़ा समय है क्या?"
      }
    ],
    quiz: {
      question: "'काम हो गया' को Marathi में कैसे कहते हैं?",
      options: ["काम झालं.", "काम आहे.", "काम नाही.", "काम करा."],
      correct: 0
    },
    recall: {
      sentence: "हे मला ___ नाही.",
      tiles: ["समझलं", "आवडलं", "मिळालं"],
      correct: "समझलं"
    }
  },
  {
    id: 5,
    title: "मदद और इमरजेंसी",
    subtitle: "Help & Emergency",
    context: "ये phrases तुम्हें कभी ज़रूरत न पड़े। लेकिन इन्हें जानना ज़रूरी है। इन्हें पहले सीखो।",
    phrases: [
      {
        marathi: "मला मदत करा.",
        transliteration: "Mala madat kara.",
        hindi: "मेरी मदद करो।"
      },
      {
        marathi: "डॉक्टर कुठे आहे?",
        transliteration: "Doctor kuthe aahe?",
        hindi: "डॉक्टर कहाँ है?"
      },
      {
        marathi: "पोलीस बोलवा.",
        transliteration: "Police bolva.",
        hindi: "पुलिस बुलाओ।"
      },
      {
        marathi: "मी हरवलो/हरवले आहे.",
        transliteration: "Mee harwalo/harwale aahe.",
        hindi: "मैं खो गया/गई हूँ।"
      },
      {
        marathi: "हे माझं नाही.",
        transliteration: "He maazha naahi.",
        hindi: "यह मेरा नहीं है।"
      }
    ],
    quiz: null,
    recall: null
  }
];
