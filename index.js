import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Global objects
let lenis;

const controlPerks = () => {
	const perkControls = document.querySelector('.perk__controls');
	const perkControlsButtons = perkControls.querySelectorAll('.perk__button');
	const perksCarousel = document.querySelectorAll('.perks__carousel');
	const perkControlsBtnText = document.querySelector('.perk__title h3');

	let curPerk = 0;
	const maxPerk = 2;
	const minPerk = 0;
	const timelineDuration = 0.3;

	const timelines = [
		// 0
		gsap
			.timeline({
				paused: false,
			})
			.fromTo(
				Array.from(perksCarousel[0].children),
				{
					autoAlpha: 0,
				},
				{
					autoAlpha: 1,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[0].children[0],
				{
					y: 150,
					rotate: 15,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[0].children[1],
				{
					y: 100,
					rotate: 3,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[0].children[2],
				{
					y: 100,
					rotate: -15,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[0].children[3],
				{
					y: 200,
					rotate: -3,
					duration: timelineDuration,
				},
				0
			),

		// 1
		gsap
			.timeline({
				paused: true,
			})
			.fromTo(
				Array.from(perksCarousel[1].children),
				{
					autoAlpha: 0,
				},
				{
					autoAlpha: 1,
					duration: timelineDuration,
				}
			)
			.from(
				perksCarousel[1].children[0],
				{
					y: 150,
					rotate: -15,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[1].children[1].firstElementChild,
				{
					y: 100,
					x: -50,
					rotate: -10,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[1].children[1].lastElementChild,
				{
					y: 100,
					rotate: 10,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[1].children[2],
				{
					y: 70,
					x: 20,
					rotate: -35,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[1].children[3],
				{
					y: 190,
					x: 5,
					rotate: -15,
					duration: timelineDuration,
				},
				0
			),

		// 2
		gsap
			.timeline({
				paused: true,
			})
			.fromTo(
				Array.from(perksCarousel[2].children),
				{
					autoAlpha: 0,
				},
				{
					autoAlpha: 1,
					duration: 0.3,
				}
			)
			.from(
				perksCarousel[2].children[0],
				{
					y: 100,
					rotate: 45,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[2].children[1],
				{
					x: 50,
					y: 80,
					rotate: 10,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[2].children[2],
				{
					y: 250,
					rotate: -25,
					duration: timelineDuration,
				},
				0
			)
			.from(
				perksCarousel[2].children[3],
				{
					x: 20,
					y: 100,
					rotate: -10,
					duration: timelineDuration,
				},
				0
			),
	];

	const toggleButtons = () => {
		perkControlsButtons.forEach(btn => {
			btn.classList.toggle('perk__button--disabled');
			btn.disabled = !btn.disabled;
		});
	};

	perkControls.addEventListener('click', e => {
		const btn = e.target.closest('.perk__button');
		if (!btn) return;

		// Toggle buttons
		toggleButtons();

		const oldPerk = curPerk;
		if (btn.className.includes('right')) {
			curPerk >= maxPerk ? (curPerk = minPerk) : curPerk++;
		}
		if (btn.className.includes('left')) {
			curPerk === minPerk ? (curPerk = maxPerk) : curPerk--;
		}
		perkControlsBtnText.textContent = `job perk 0${curPerk + 1}`;

		// Reverse old timeline and play current and toggle buttons
		timelines[oldPerk].reverse();

		setTimeout(() => {
			timelines[curPerk].play();
			toggleButtons();
		}, timelineDuration * 3 * 1000);
	});
};
const controlParallax = () => {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: '.hero',
			start: 'top top',
			end: 'bottom+=600 center',
			scrub: true,
			// markers: true,
		},
	});

	tl.to(['.header', '.hero__content'], {
		y: 600,
	})
		.to(['#hero__luna', '#hero__rays'], { y: 500 }, 0)
		.to('#hero__manny', { y: 400 }, 0)
		.to('#hero__dust', { y: 200 }, 0)
		.to('#hero__jax', { y: 300 }, 0);
};
const controlNavigation = () => {
	const navbar = document.querySelector('.navbar');
	navbar.addEventListener('click', e => {
		e.preventDefault();
		const { href } = e.target.dataset;
		if (!href) return;
		const section = document.querySelector(href);
		lenis.scrollTo(section);
	});
};
const initiateLenis = () => {
	lenis = new Lenis();

	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add(time => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
};

const init = () => {
	initiateLenis();
	controlPerks();
	controlParallax();
	controlNavigation();
};
init();
