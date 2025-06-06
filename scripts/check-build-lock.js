#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const LOCK_FILE = 'output/.build-lock';
const STALE_LOCK_MINUTES = 30;

export async function checkBuildLock() {
  try {
    const stats = await fs.stat(LOCK_FILE);
    const lockAge = Date.now() - stats.mtimeMs;
    const staleTime = STALE_LOCK_MINUTES * 60 * 1000;
    
    if (lockAge > staleTime) {
      console.log('⚠️  Removing stale build lock (older than 30 minutes)');
      await fs.unlink(LOCK_FILE);
      return true;
    }
    
    console.error('❌ Another build is currently in progress!');
    console.error(`   Lock file created ${Math.round(lockAge / 60000)} minutes ago`);
    console.error('   Wait for it to complete or remove output/.build-lock if stuck');
    return false;
  } catch (err) {
    // Lock doesn't exist, we're good
    return true;
  }
}

export async function createBuildLock() {
  await fs.mkdir('output', { recursive: true });
  await fs.writeFile(LOCK_FILE, new Date().toISOString());
}

export async function removeBuildLock() {
  try {
    await fs.unlink(LOCK_FILE);
  } catch (err) {
    // Ignore if already removed
  }
}