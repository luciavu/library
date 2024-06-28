function toggleActive(button) {
    let target = document.getElementById(button);
    if (target.classList.contains("active")) {
        return;
    } else {
        let currentActive = document.querySelector('.active');
        currentActive.classList.remove('active');
        target.classList.add('active');
    }
}