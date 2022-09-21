const Clock = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <g>
      <path d="M12 0a12 12 0 1 1 0 24 12 12 0 0 1 0-24Zm0 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm-.9 2.8a.9.9 0 0 1 .892.778l.008.12V12h3.9a.9.9 0 0 1 .12 1.792l-.12.008h-4.8a.9.9 0 0 1-.892-.778l-.008-.12v-7.2a.9.9 0 0 1 .9-.902Z" />
    </g>
  </svg>
)

export default Clock
