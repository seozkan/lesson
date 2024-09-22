const startTime = "13:30";
const lessonDuration = 30 * 60;
const breakDuration = 10 * 60; 
const lessonsPerDay = 7;

const percentageCompleteEl = document.getElementById('percentage-complete');
const currentLessonEl = document.getElementById('current-lesson');
const timeLeftEl = document.getElementById('time-left');
const circleEl = document.getElementById('pro');
const totalLength = circleEl.getTotalLength();

const start = new Date();
const [startHours, startMinutes] = startTime.split(":").map(Number);
start.setHours(startHours, startMinutes, 0);

const end = new Date(start);
end.setSeconds((lessonDuration * lessonsPerDay) + (breakDuration * (lessonsPerDay - 1)));

setInterval(updateLessonInfo, 1000);

function updateLessonInfo() {
    const now = new Date();
    const secondsPassed = Math.floor((now - start) / 1000);
    const totalLessonTime = lessonDuration + breakDuration;
    const currentLesson = Math.floor(secondsPassed / totalLessonTime) + 1;
    const timeInCurrentLesson = secondsPassed % totalLessonTime;

    // Teneffüsteyse
    if (timeInCurrentLesson >= lessonDuration) {
        timeLeftEl.textContent = `Tenfs.`;
        percentageCompleteEl.textContent = "100";
        circleEl.style.strokeDashoffset = totalLength;
    } else {
        // Ders süresi
        const remainingSeconds = lessonDuration - timeInCurrentLesson;
        const percentageComplete = ((lessonDuration - remainingSeconds) / lessonDuration) * 100;

        // Kalan süreyi göster
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        timeLeftEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Yüzde ve çember animasyonu
        percentageCompleteEl.textContent = `%${Math.floor(percentageComplete)}`;
        const dashOffset = totalLength * (percentageComplete / 100);
        circleEl.style.strokeDashoffset = dashOffset;
    }

    // Kaçıncı dersteyiz
    if (now.getTime() < start.getTime() || now.getTime() > end.getTime()) {
        currentLessonEl.textContent = "Ders Yok";
        percentageCompleteEl.textContent = "--.--"
        timeLeftEl.textContent = "--.--"
        circleEl.style.strokeDashoffset = 0

    } else {
        currentLessonEl.textContent = `${currentLesson}. Ders`;
    }
}