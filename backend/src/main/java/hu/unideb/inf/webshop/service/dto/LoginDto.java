package hu.unideb.inf.webshop.service.dto;

import java.util.Objects;

public class LoginDto {
    private String emailAddress;
    private String password;

    public LoginDto() {
    }

    public LoginDto(String email, String password) {
        this.emailAddress = email;
        this.password = password;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginDto that = (LoginDto) o;
        return Objects.equals(emailAddress, that.emailAddress) && Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(emailAddress, password);
    }
}
