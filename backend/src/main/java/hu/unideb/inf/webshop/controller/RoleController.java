package hu.unideb.inf.webshop.controller;

import hu.unideb.inf.webshop.data.entity.RoleEntity;
import hu.unideb.inf.webshop.data.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/webshop/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("")
    public List<RoleEntity> getRoles(){
        return roleRepository.findAll();
    }

    @GetMapping("/{roleId}")
    public RoleEntity getById(@PathVariable("roleId") int roleId){
        return roleRepository.findById(roleId).orElse(null);
    }

    @PostMapping("")
    public RoleEntity saveRole(@RequestBody RoleEntity role){
        return roleRepository.save(role);
    }

    @PutMapping("/{roleId}")
    public RoleEntity updateRole(@RequestBody RoleEntity role) {
        if(role.getRoleId() > 0L){
            return roleRepository.save(role);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{roleId}")
    public void deleteRole(@PathVariable("roleID") int roleId){
        roleRepository.deleteById(roleId);
    }
}