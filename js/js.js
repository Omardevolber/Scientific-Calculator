let ans = 0;  // لتخزين النتيجة الأخيرة
let hasCalculated = false;

// لتحديث العرض عند الضغط على الأزرار
function appendToDisplay(value) {
    if (hasCalculated) {
        clearDisplay();
        hasCalculated = false;
    }
    document.getElementById('display').innerText += value; // تحديث شاشة العرض بإضافة القيمة الجديدة
}

// لمسح كامل العرض
function clearDisplay() {
    document.getElementById('display').innerText = '';
}

// لمسح النص المحدد فقط
function deleteSelected() {
    let display = document.getElementById('display').innerText;
    document.getElementById('display').innerText = display.slice(0, -1); // حذف آخر قيمة تم إدخالها
}

// دالة لحساب النتيجة وعرضها تحت المعادلة في نفس العنصر
function calculate() {
    try {
        let display = document.getElementById('display');
        let currentDisplay = display.innerText;

        // استبدال الصيغ الرياضية التقليدية بـ Math في العمليات الحسابية
        let formattedEquation = currentDisplay
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/sec\(/g, '(1/Math.cos(')
            .replace(/cot\(/g, '(1/Math.tan(')
            .replace(/csc\(/g, '(1/Math.sin(')
            .replace(/√\(/g, 'Math.sqrt(')
            .replace(/∛\(/g, 'Math.cbrt(');

        // حساب النتيجة
        let result = eval(formattedEquation); // استخدام eval لتنفيذ المعادلة كعملية حسابية

        // عرض المعادلة والنتيجة بشكل طبيعي، النتيجة ستكون في سطر جديد
        display.innerHTML = currentDisplay + '<br>' + '<b>' + result + '</b>'; // عرض المعادلة الأصلية مع النتيجة تحتها
        ans = result;  // تخزين النتيجة في ANS
        hasCalculated = true;
    } catch (error) {
        document.getElementById('display').innerHTML = 'Error';
    }
}

// دالة لإدخال الجذر التربيعي بشكل طبيعي
function appendSquareRoot() {
    appendToDisplay('√(');
}

// دالة لإدخال الجذر التكعيبي بشكل طبيعي
function appendCubeRoot() {
    appendToDisplay('∛(');
}

// دالة لإضافة x² (الأس 2)
function appendSquarePower() {
    appendToDisplay('²');
}

// دالة لإضافة x³ (الأس 3)
function appendCubePower() {
    appendToDisplay('³');
}

// دالة لإضافة القيمة المطلقة |x|
function appendAbsoluteValue() {
    appendToDisplay('|x|');
}

// دالة لإدخال اللوغاريتم log بشكل طبيعي
function appendLog() {
    appendToDisplay('log(');
}


// دالة لإدخال ANS
function appendAns() {
    appendToDisplay(ans);
}

// دعم إدخال الأرقام والعمليات الحسابية عبر لوحة المفاتيح
document.addEventListener('keydown', function(event) {
    let key = event.key;

    // السماح بإدخال الأرقام والعمليات الأساسية
    if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        appendToDisplay(key);
    } 
    else if (key === 'Enter') {  // مفتاح Enter لحساب النتيجة
        event.preventDefault(); // منع السلوك الافتراضي
        calculate();
    }
    else if (key === 'Backspace') {  // مفتاح Backspace لحذف آخر مدخل
        deleteSelected();
    }
    else if (key === 'Escape') {  // مفتاح Escape لمسح كل شيء
        clearDisplay();
    }
});
