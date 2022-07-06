package hr.tvz.android.musicsocial.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import hr.tvz.android.musicsocial.R
import hr.tvz.android.musicsocial.databinding.ActivityLoginBinding
import hr.tvz.android.musicsocial.viewmodel.UserViewModel

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var viewModel: UserViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this).get(UserViewModel::class.java)

        binding.loginRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

        binding.loginButton.setOnClickListener {
            val username = binding.loginUsername.text.toString().trim()
            val password = binding.loginPassword.text.toString().trim()

            if(checkValidation()) {
                viewModel.loginUser(username, password, this)
            }
        }
    }

    fun checkValidation() : Boolean {
        binding.loginUsername.error = null
        binding.loginPassword.error = null

        if(binding.loginUsername.text.toString().length < 3) {
            binding.loginUsername.error = resources.getString(R.string.login_username_validation)
            return false
        }

        if(binding.loginPassword.text.toString().length < 5) {
            binding.loginPassword.error = resources.getString(R.string.login_password_validation)
            return false
        }

        return true
    }
}