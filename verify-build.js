#!/usr/bin/env node

import { readFileSync, existsSync, statSync } from 'fs'
import { join } from 'path'

console.log('🔍 Verifying Realm Loader NPM build...\n')

// Check if dist directory exists
if (!existsSync('dist')) {
  console.error('❌ dist directory not found. Run "npm run build" first.')
  process.exit(1)
}

// Check main files
const requiredFiles = [
  'dist/index.js',
  'dist/index.esm.js',
  'dist/index.d.ts',
  'dist/index.css',
  'dist/index.esm.css'
]

let allFilesExist = true

requiredFiles.forEach(file => {
  if (existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.error(`❌ ${file} missing`)
    allFilesExist = false
  }
})

// Check package.json
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
  
  console.log('\n📦 Package info:')
  console.log(`   Name: ${packageJson.name}`)
  console.log(`   Version: ${packageJson.version}`)
  console.log(`   Main: ${packageJson.main}`)
  console.log(`   Module: ${packageJson.module}`)
  console.log(`   Types: ${packageJson.types}`)
  
  // Check if main files are properly referenced
  if (packageJson.main !== 'dist/index.js') {
    console.error('❌ package.json main field incorrect')
    allFilesExist = false
  }
  
  if (packageJson.module !== 'dist/index.esm.js') {
    console.error('❌ package.json module field incorrect')
    allFilesExist = false
  }
  
  if (packageJson.types !== 'dist/index.d.ts') {
    console.error('❌ package.json types field incorrect')
    allFilesExist = false
  }
  
} catch (error) {
  console.error('❌ Error reading package.json:', error.message)
  allFilesExist = false
}

// Check dist file sizes
console.log('\n📊 File sizes:')
requiredFiles.forEach(file => {
  if (existsSync(file)) {
    const stats = statSync(file)
    const sizeKB = (stats.size / 1024).toFixed(2)
    console.log(`   ${file}: ${sizeKB} KB`)
  }
})

if (allFilesExist) {
  console.log('\n🎉 Build verification successful!')
  console.log('\n📋 Next steps:')
  console.log('   1. Test the package: npm test')
  console.log('   2. Publish to npm: npm publish')
  console.log('   3. View example: open usage-example.html')
} else {
  console.log('\n❌ Build verification failed!')
  process.exit(1)
}
