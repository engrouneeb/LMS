package com.lmsapp

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.MainActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val fcmIntent = this.intent
        val bundle = fcmIntent.extras
        val intent = Intent(this, MainActivity::class.java).apply {
            putExtras(fcmIntent)
        }
        startActivity(intent)
        finish()
    }
}
